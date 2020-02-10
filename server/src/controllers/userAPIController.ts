import { Request, Response } from "express";
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken";

export const userAPI = (req: Request, res: Response) => {
    console.log("userApi");
    res.status(200).send("here is the userAPI router");
};

export const allUsers = async (req: Request, res: Response) => {
    console.log("all users");
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const newUser = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET;
    const { name, email, password, city, company, registerDate } = req.body;
    const user = new User({
        name,
        email,
        password,
        city,
        company,
        registerDate,
        role: "User"
    });
    try {
        const newUser = await user.save();
        console.log(newUser);
        const payload = { newUser };
        if (secret !== undefined) {
            const token = jwt.sign(payload, secret);
            console.log("auth ok");
            res.cookie("token", token, { httpOnly: true })
                .status(200)
                .json({ message: "Auth OK" });
        }

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const findUser = (req: Request, res: Response) => {
    res.status(200).send(res.user);
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await res.user.remove();
        res.status(200).json({ message: "Deleted subscriber" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authenticateUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const secret = process.env.JWT_SECRET;
    try {
        const user = await User.findOne({ email });
        if (user === null) {
            console.log("no user");
            res.status(401).json({ message: "Incorrect email or password" });
        } else {
            const resp = user.isCorrectPassword(password);
            const match = <boolean>await resp;
            if (match) {
                const payload = { user };
                if (secret !== undefined) {
                    const token = jwt.sign(payload, secret);
                    console.log("auth ok");
                    res.cookie("token", token, { httpOnly: true })
                        .status(200)
                        .json({ message: "Auth OK" });
                }
            } else {
                console.log("no match");
                res.status(401).json({
                    message: "Incorrect email or password"
                });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

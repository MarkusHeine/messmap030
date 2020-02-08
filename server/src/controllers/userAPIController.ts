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
    const {
        name,
        email,
        password,
        city,
        company,
        registerDate,
        role
    } = req.body;
    const user = new User({
        name,
        email,
        password,
        city,
        company,
        registerDate,
        role
    });
    try {
        const newUser = await user.save();
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
            res.status(401).send({ message: "Incorrect email or password" });
        } else {
            const resp = user.isCorrectPassword(password);
            const match = <boolean>await resp;
            if (match) {
                const payload = { user };
                if (secret !== undefined) {
                    const token = jwt.sign(payload, secret);
                    res.cookie("token", token, { httpOnly: true })
                        .status(200)
                        .send("cookies sent");
                }
            } else {
                res.status(401).send({
                    message: "Incorrect email or password"
                });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

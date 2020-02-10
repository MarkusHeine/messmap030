import { Request, Response } from "express";
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken";
import createError from "http-errors";

export const userAPI = (_req: Request, res: Response) => {
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
    const {
        name,
        email,
        repeatEmail,
        password,
        repeatPassword,
        city,
        company,
        registerDate
    } = req.body;

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
        if (repeatEmail !== email) {
            throw createError(400, "Emails does not match");
        }
        if (password !== repeatPassword) {
            throw createError(400, "Passwords does not match");
        }
        const newUser = await user.save();
        const payload = { newUser };
        if (secret !== undefined) {
            const token = jwt.sign(payload, secret);
            res.cookie("token", token, { httpOnly: true })
                .status(200)
                .send(newUser);
        }
    } catch (error) {
        console.log(error.code);
        if (error.code === 11000) {
            res.status(400).json({ message: "Email alreday exists" });
        } else {
            res.status(error.statusCode).json({ message: error.message });
        }
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
            throw createError(401, "Incorrect email or password");
            // res.status(401).json({ message:  });
        } else {
            const resp = user.isCorrectPassword(password);
            const match = <boolean>await resp;
            if (match) {
                const payload = { user };
                if (secret !== undefined) {
                    const token = jwt.sign(payload, secret);
                    res.cookie("token", token, { httpOnly: true })
                        .status(200)
                        .send(user);
                }
            } else {
                throw createError(401, "Incorrect email or password");
            }
        }
    } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
    }
};

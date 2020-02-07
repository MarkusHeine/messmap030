import { Request, Response, NextFunction } from "express";
import { User } from "../models/userSchema";

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user === null) {
            res.status(404).json({ message: "cannot find user" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    if (user !== null) {
        res.user = user;
    }
    next();
};

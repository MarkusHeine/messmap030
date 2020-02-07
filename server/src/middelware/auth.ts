import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const withAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send("Unauthorized: No token provided");
    } else {
        if (secret !== undefined) {
            try {
                const test = jwt.verify(token, secret);
                res.status(200);
                next();
            } catch (error) {
                res.status(401).send("Unauthorized: No token provided");
                next();
            }
        }
    }
};

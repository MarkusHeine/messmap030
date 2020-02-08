import { IUser } from "./models/userSchema";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            COOKIESESSION_SECRET: string;
            PORT: string;
            DB_URI_USERS: string;
            JWT_SECRET: string;
        }
    }
}

declare module "express-serve-static-core" {
    interface Response {
        user: IUser;
    }
}

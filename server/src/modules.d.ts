declare module NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        COOKIESESSION_SECRET: string;
        PORT: string;
        DB_URI_USERS: string;
    }
}

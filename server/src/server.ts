import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import compression from "compression";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
dotenv.config();

const { PORT } = process.env;
const { DB_URI_USERS } = process.env;

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
};

const indexRouter = require("./routes/index");
const userAPIRouter = require("./routes/userAPI");

mongoose.connect(
    DB_URI_USERS,
    { useNewUrlParser: true, useUnifiedTopology: true },
    error => {
        if (error) {
            console.log(error.message);
        } else {
            console.log("conntected to db");
        }
    }
);

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cors(corsOptions));

const cookieSessionMiddleware = cookieSession({
    secret: process.env.COOKIESESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});
app.use(cookieSessionMiddleware);

app.use("/index", indexRouter);
app.use("/userAPI", userAPIRouter);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

import express from "express";
import * as bodyParser from "body-parser";
import compression from "compression";
import cookieSession from "cookie-session";
import cors from "cors";
import * as dotenv from "dotenv";

const app = express();

const PORT = 8080;

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
};

const indexRouter = require("./routes/index");
const userAPIRouter = require("./routes/userAPI");

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
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

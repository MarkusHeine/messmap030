import express from "express";
import * as indexController from "../controllers/indexController";

const router = express();

router.get("/", indexController.index);

module.exports = router;

import { withAuth } from "./../middelware/auth";
import express, { Request, Response } from "express";
import * as indexController from "../controllers/indexController";

const router = express();

router.get("/", indexController.index);
router.get("/newEntry", withAuth, indexController.newEntry);

module.exports = router;

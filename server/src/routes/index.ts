import express from "express";
import * as indexController from "../controllers/indexController";

const router = express();

router.get("/", indexController.index);
router.get("/newEntry", indexController.newEntry);

module.exports = router;

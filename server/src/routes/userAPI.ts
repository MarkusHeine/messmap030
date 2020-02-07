import express, { Request, Response } from "express";
import * as userAPIController from "../controllers/userAPIController";
import { getUser } from "../middelware/getUser";
import { withAuth } from "../middelware/auth";

const router = express();

router.get("/", userAPIController.allUsers);
router.post("/", userAPIController.newUser);
router.get("/checkToken", withAuth, (req: Request, res: Response) => {
    res.status(200).send("ok");
});
router.get("/:id", getUser, userAPIController.findUser);
router.delete("/:id", getUser, userAPIController.deleteUser);

router.post("/auth", userAPIController.authenticateUser);

module.exports = router;

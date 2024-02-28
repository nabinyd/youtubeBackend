import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";


const router = Router();
const i = 10

router.route("/register").post(registerUser);

export default router;
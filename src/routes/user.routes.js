import { Router } from "express";
import { logOutUser, loginUser, refreshAccessToken, registerUser } from "../controllers/user.controllers.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
const i = 10

router.route("/register").post(upload.fields([{
    name: "avatar",
    maxCount: 1

}, {
    name: "coverImage",
    maxCount: 1
}]), registerUser);

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logOutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
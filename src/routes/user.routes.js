import { Router } from "express";
import { 
    loginUser,
    // googleLogin,
    logoutUser, 
    registerUser,
    changeCurrentPassword,
    getCurrentUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const userRouter = Router(); 

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
// userRouter.route("/google-login").post(googleLogin);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);




export default userRouter;
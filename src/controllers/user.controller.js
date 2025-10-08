import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"; 
// import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {


    const {fullName, email, password } = req.body

    if (
        [fullName, email, password].some((field) => field?.trim() === "")  
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ fullName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long")
    }

    
   

    const user = await User.create({
        fullName,
        email, 
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

// const googleLogin = async (req,res) => {
//     try {
//         const {code} = req.query;
//         const googleRes = await oauth2client.getToken(code);
//         oauth2client.setCredentials(googleRes.tokens);
//         const userRes = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`, 
//         );
//         const {email, name} = userRes.data;
//         let user = await User.findOne({email});
//         if(!user) {
//             user = await User.create({name,email})
//         }
//            const {_id} = user;
//            const token = jwt.sign({ _id, email},
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_TIMEOUT }
//            )
//            return res.status(200).json({
//             message: "User logged in successfully",
//             token,
//             user
//            })
        
//     } catch (error) {
//         res.status(500).json({message: "Internal Server Error", error: error.message})
//     }
// }

const loginUser = asyncHandler(async (req, res) =>{

    const {email, fullName, password} = req.body
    console.log(email);

    if (!fullName && !email) {
        throw new ApiError(400, "username or email is required")
    }
    if (!password || password.trim() === "") {
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({
        $or: [{fullName}, {email}] 
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }
        },
        {
            new: true
        }
    )

    const options = {     
        httpOnly: true,  
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

export {
    registerUser,
    // googleLogin,
    loginUser,
    logoutUser, 
    getCurrentUser,
    changeCurrentPassword  
}

import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation -- not empty
    // cheeck if user already exists
    // check for images and avatar
    // upload to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token
    // check for user creation
    // return response

    const { fullname, email, password, username } = req.body
    console.log("email: ", email, "password: ", password)

    // if (fullname === "") {
    //     throw new ApiError(400, "Fullname is required")
    // }

    if ([fullname, email, password, username].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, " User with this email and password alredy exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    console.log(`avatar location: ${avatarLocalPath}`)
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required path")
    }



    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "something went wrong no user created")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfuly"))

})


export { registerUser }
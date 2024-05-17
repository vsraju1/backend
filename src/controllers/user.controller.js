import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=> {
    // get user details from frontend
    // validation - required fields should not empty
    // check if user already exists: username or email or both
    // check for images(profile picture, avatar etc)
    // upload them to cloudinary (if images are there)
    // create user object - create entry in db
    // remover password and refresh token field from reponse
    // check for user creation
    // return response

    const {username, email, fullName, password} = req.body
    console.log("email :", email)

    if([fullName, email, username,password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "fullName is required")
    }


    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username is exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400,'avatar file is required!!')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImg = await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar) {
        throw new ApiError(400, 'avatar is required')
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImg: coverImg?.url || "",
        email,
        password, 
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createUser) {
        throw new ApiError(500, "Something went wrong registring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully")
    )


})

export { registerUser }
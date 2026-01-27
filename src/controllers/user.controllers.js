import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exist : username and email
    //check for images 
    //check for avatar
    //upload them to cloudinary,avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check user is created or not
    //return response

    const {fullName, email, username, password}= req.body
    console.log("email: ", email)

    if (
        [fullName,email,username,password].some((field) =>
            field?.trim()==="")
    ) {
        throw ApiError(400, "All fields are required")
    } 


    const existedUser = User.findOne({
        $or: [{ username } , { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocaLPath = req.files?.avatar[0]?.path;
    const coverImagePath = req.files?.coverImage[0]?.path;

    if(!avatarLocaLPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocaLPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if(!avatar){
        throw new ApiError(400 , "Avatar is mandatory")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select(
        "-passeord -refreshToken "
    )

    if(!createduser){
        throw new ApiError(500 , "Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createduser, "User Registered successfully")
    )

})


export {
    registerUser,
}
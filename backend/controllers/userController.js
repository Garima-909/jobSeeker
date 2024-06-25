import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async(req, res, next) => {
    const {name, email, phone, role, password} = req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill full registration form"));
    }

    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("This email already exists!"));
    }

    const user = await User.create({
        name, email, phone, role, password
    });

    sendToken(user, 201, res, "User registered successfully!");
});







export const login = catchAsyncError(async (req, res, next) => {
    const {email, password, role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill email, password, role.", 400));
    }

    const user = await User.findOne({email}).select("+password");
    console.log(user);
    if(!user){
        return next(new ErrorHandler("Invalid email or password!", 400)) ;
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password!", 400)) ;
    }

    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found!", 400)) ;
    }

    sendToken(user, 200, res, "User logged in successfully!");
});








export const logout = catchAsyncError((req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure : true,
        sameSite: "None"
    })//yhan whi aayega jo sendToken k options m h
    .json({
        success: true,
        message: "User logged out successfully!"
    })
});








export const getUser = catchAsyncError(async(req, res, next) => {
    const user = req.user;
    // console.log("yep");
    // console.log(user);
    // console.log("nope");
    res.status(200).json({
        success: true,
        user
    })
});
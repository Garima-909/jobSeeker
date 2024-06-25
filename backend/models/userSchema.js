import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength : [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Maximum number of characters is 30"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email."]
    }, 
    phone: {
        type: Number,
        required: [true, "Please provide your phone number."]
    },
    password: {
        type: String,
        required: [true, "Please provide your password."],
        minLength: [8, "Password must contain atleast 8 characters."],
        maxLength: [32, "Maximum number of characters is 32"],
        select: false
    }, 
    role: {
        type: String,
        required: [true, "Please provide your role."],
        enum: ["Job seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


//HASHING THE PASSWORD
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password =  await bcrypt.hash(this.password, 10);//10 represents level of hashing
});

//COMPARING THE PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN FOR AUTHORISATION
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
};

export const User = mongoose.model("User", userSchema);
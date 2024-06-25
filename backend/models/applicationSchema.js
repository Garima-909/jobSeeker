import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."],
        minLength: [3, "Name must contain atleast 3 characters."],
        maxLength: [30, "Name can contain atmost 30 characters."]
    },
    email: {
        type: String,
        required: [true, "Please provide your email."],
        validator: [validator.isEmail, "Please provide a valid email."]
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your cover letter."]
    },
    phone: {
        type: Number,
        required: [true, "Please provide your phone Number."]
    },
    address: {
        type: String,
        required: [true, "Please provide your address."]
    },
    resume: {
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    applicantID:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerID:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    }
});

export const Application = mongoose.model("Application", applicationSchema);
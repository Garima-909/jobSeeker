import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide a job title."],
        minLength: [3, "Job title must contain atleast 3 characters"],
        maxLength: [30, "Job title can contain at max 30 characters."]
    },
    description:{
        type: String,
        required: [true, "Please provide a job title."],
        minLength: [30, "Job title must contain atleast 30 characters"],
        maxLength: [100, "Job title can contain at max 100 characters."]
    },
    category: {
        type: String,
        required: [true, "Job category is required!"]
    },
    country: {
        type: String,
        required: [true, "Job country is required!"]
    },
    city: {
        type: String,
        required: [true, "Job city is required!"]
    },
    location: {
        type: String,
        required: [true, "Please provide exact location"],
        minLength: [50, "Location must contain atleast 5f0 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Salary must contain atleast 4 digits!"],
        maxLength: [9, "Salary cannot exceed 9 digits!"]
    }, 
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain atleast 4 digits!"],
        maxLength: [9, "Salary cannot exceed 9 digits!"]
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain atleast 4 digits!"],
        maxLength: [9, "Salary cannot exceed 9 digits!"]
    }, 
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now()//yhan glti ho skti h () m
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});


export const Job = mongoose.model("Job", jobSchema);
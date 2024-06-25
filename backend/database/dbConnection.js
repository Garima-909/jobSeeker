import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "jobSeeker"
    }).then(() => {
        console.log("connected to DB successfully")
    }).catch((err) => {
        console.log(`Some error occurred while connecting to DB : ${err}`);
    });
};
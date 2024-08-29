
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "Please provide your full name"]
    },
    userName : {
        type : String,
        unique : [true, "Username already exists"],
    },
    email : {
        type : String,
        required : [true, "Please provide your email"],
        unique : [true, "Email already exists"],
    },
    password : {
        type : String,
        required : [true, "Please provide your password"],
    },
    gender :{
        type : String,
        enum : ["Male","Feamle","Other"]
    },
    category : {
        type : String,
        enum: ["Deaf", "Dumb"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
    },
    otp: {
        type: Number,
    },
    otpExpire: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    chatHistory: [String]

    })

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
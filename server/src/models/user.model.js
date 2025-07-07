import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profilePic: {
            type: String,
            default: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?d=mp&f=y",
            required: false
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

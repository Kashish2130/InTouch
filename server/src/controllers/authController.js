import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }


        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10); //salt means number of rounds to generate the hash
        //genSalt generates a salt and returns it
        //bcrypt.genSalt(10) means it will generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate a token or any other logic you want to implement
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message: "User created successfully", user: newUser
            });
        }
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    }
    catch (error) {
        console.error("error in signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);

        return res.status(200).json({ 
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.error("error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        console.error("error in logout:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {}

import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    
    // Set the token in a cookie
    // The cookie will be sent to the client and stored in the browser
    // The cookie will be sent with every request to the server
    // The cookie will be used to authenticate the user

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie , aslo prevents XSS attacks cross-site scripting attacks
        secure: process.env.NODE_ENV != "development", // Set to true in production to ensure the cookie is sent over HTTPS
        sameSite: "strict"
    });
    return token;
}   
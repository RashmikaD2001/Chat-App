import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    // create a token

    const { JWT_SECRET, NODE_ENV} = process.env

    if(!JWT_SECRET || !NODE_ENV) throw new Error ("Environment Variables are missing")

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("jwtToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true,
    })

    return token
}
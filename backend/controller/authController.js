import User from "../model/userSchema.js"
import { z } from "zod"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userZodSchema = z.object({
    username: z.email(),
    password: z.string().min(6)
})


export const register = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password

        const validation = userZodSchema.safeParse({ username, password })

        if (!validation.success) {
            return res.status(400).json({
                message: "Invaild Inputs"
            })
        }

        const existingUser = await User.findOne({ username });
        // console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Server error"
        })
    }

}



export const login = async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password;

        const validation = userZodSchema.safeParse({ username, password })

        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid inputs"
            })
        }

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({
                message: "User not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.status(200).json({
            token,
            username:user.username
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}
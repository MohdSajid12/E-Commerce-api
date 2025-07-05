import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(401).json({
                message: "All fields required",
                success: false
            })
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashPassword
        })

        return res.status(200).json({
            message: "User Register Successfully",
            success: true
        })
    }
    catch (error) {
        cconsole.log(error);
    }


}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "All field is required",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user not exists", success: false })
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invlid Credentials", success: false });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT, {
            expiresIn: '1d'
        });

        return res.status(200).json({ message: `welcome ${user.name}`, token, message: true });


    }
    catch (error) {
        console.log(error);
    }



}
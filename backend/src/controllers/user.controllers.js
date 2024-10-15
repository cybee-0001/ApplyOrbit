import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const {fullname, email, phoneNumber,password, role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }

        const user = await User.findOne({email});
        if(user){
            return  res.status(400)
            .json({
                message: "Email already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        
    } catch (error) {
        
    }
}
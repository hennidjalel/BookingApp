import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { creatError } from "../utils/error.js";
import jwt from "jsonwebtoken";


//___________ REGISTER ___________
export const register = async (req, res, next) => {
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);    
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save();
        res.status(200).send("user has been created.")
    }catch(err){
        next(err);
    }
}

// ___________ LOGIN ___________

export const login = async (req, res, next) => {
    
    try{
        const user = await User.findOne({username: req.body.username});
        if (!user) 
        return next(createError(404, "User not found"));

        
        // checl if password is correct
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) 
        return next(createError(400, "Password or username is incorrect"));

        // create token and verify it's admin
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({...otherDetails});  


    }catch(err){
        next(err);
    }
}
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const registerController=async(req,res)=>{
    try {
        const {username,email,password,phone,address,answer} = req.body;

        //validation
        if (!username || !email || !password || !phone || !address || !answer ) {
           return res.status(500).send({
                  success:false,
                  message:'please provide all fields'
            });
        }

        //check user
        const existing = await userModel.findOne({email});
        if (existing) {
            return res.status(500).send({
                success:false,
                message:'User already exist please login'
            });
        }

        //hashing password 

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        //create new user
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,
            phone,
            address,
            answer,
        });

        res.status(200).send({
            success:true,
            message:'Successfully registered',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registered API',
            error
        });
    }
}

const loginController = async(req,res)=>{
    try {
        const{email,password} = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success:false,
                message:'Please Provide all fields'
            });
        }

        const user = await userModel.findOne({email});
        if (!email) {
            return res.status(404).send({
                success:false,
                message:'User not found'
            });
        }

        //check user Password || compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials',
            });
        }

        //token
        const token = JWT.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        })

        user.password = undefined;

        res.status(200).send({
            success:true,
            message:"Successfully Login",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in API',
            error,
        })
    }
}

module.exports = {registerController,loginController};
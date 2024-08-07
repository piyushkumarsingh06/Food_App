const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

const getUserController = async(req,res)=>{
    try {
        //find user
        const user =await userModel.findById({_id: req.body.id});
        if (!user) {
            return res.status(500).send({
                success:false,
                massage:"user Not Found"
            })
        } 

        //hide password 

        user.password = undefined;

        res.status(200).send({
            success:true,
            message:"User get Successfully",
            user,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Unvalid API",
            error
        })
    }
}

const updateUserController = async(req,res)=>{
     try {
        //get User
        const user = await userModel.findById({_id: req.body.id});
        if (!user) {
            return res.status(401).send({
                success:false,
                message:'User not found'
            })
        }

        //update
        const{username,address,phone} = req.body;
        if(username) user.username = username;
        if(address) user.address = address;
        if(phone) user.phone = phone;

        //save user
        await user.save();
        res.status(200).send({
            success:true,
            message:"User updated successfully",
            user,
        })
        
     } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Please Provide Auth",
            error
        })
     }
}

const updateUserPasswordController = async(req,res)=>{
    try {
        const user = await userModel.findById({_id: req.body.id});
        if (!user) {
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }

        //update password
        const{oldPassword,newPassword} = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success:false,
                message:"Please Provide Old or new Password",
            });
        }
      
        //check userPassword , compare password

        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if (!isMatch) {
            return res.status(500).send({
                success:false,
                message:"Invalid old password",
            });
        }

        //hashing password

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"password updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Please Provide Auth",
            error
        })
    }
}

const resetPasswordController = async(req,res)=>{
    try {
        const {email,oldPassword,answer} = req.body;
        if (!email || !oldPassword || !answer) {
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            })
        }

        const user = await userModel.findOne({email,answer});
        if (!user) {
            return res.status(401).send({
                success:false,
                message:"user not found"
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(oldPassword,salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Please Provide Auth",
            error
        })
    }
}

const deleteUserController = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:'User deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Please provide Auth",
            error,
        })
    }
}

module.exports = {getUserController,updateUserController,updateUserPasswordController,resetPasswordController,deleteUserController};
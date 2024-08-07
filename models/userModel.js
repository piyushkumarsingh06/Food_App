const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'Phone no is required']
    },
    usertype:{
        type:String,
        required:[true,'usertype is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'
    },
    answer:{
        type:String,
        required:[true, 'Answer is required']
    }
},{timestamps:true});

//export

module.exports = mongoose.model('user',userSchema);


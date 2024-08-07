const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
   title:{
    type:String,
    required:[true,"title is required"]
   },
   imageUrl:{
    type:String,
    require:'https://th.bing.com/th/id/OIP.8RCLjsncEgiuKYZDYMXkdQHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain'
   }
},{timestamp:true});

module.exports = mongoose.model("category",categorySchema);
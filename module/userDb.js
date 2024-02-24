const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
    },
    password:
    {
        type:String,
        required:true,
    },
    cpassword:
    {
        type:String,
        required:true,
    },
    mobile:
    {
        type:String,
        required:true,
    },
    image:
    {
        public_id:
        {
            type:String,
        },
        url:
        {
            type:String,
        }
    },
    role:
    {
        type:String,
        default:'user'
    }
},{timestamps:true})
const userModel = mongoose.model('user',userSchema)
module.exports=userModel

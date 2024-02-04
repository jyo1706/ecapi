const jwt = require('jsonwebtoken')
const userModel = require('../module/userDb')


const auth = async(req,res,next)=>
{
    const {token} = req.cookies
    // console.log(token)
    try
    {
        if(token)
        {
            const verifytoken =  jwt.verify(token,"jyo@345")
            console.log(verifytoken.ID)
            const data = await userModel.findOne(verifytoken.ID._id)
             next()
        }
        else
        {
            res.status(784).
            json({status:"failed",message:"unauth user"})
        }
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports = auth
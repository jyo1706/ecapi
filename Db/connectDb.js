const mongoose = require('mongoose')


             
const connectDb = (()=>
{
    return mongoose.connect(process.env.LOCAL_URL,{
        // useCreateIndex:true,
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    }).then(()=>
    {
        console.log("connected")
    })
    .catch((error)=>
    console.log(error))
})

module.exports =connectDb
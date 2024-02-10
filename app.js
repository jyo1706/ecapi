const express = require('express')
const app = express()
const dotenv=require('dotenv')
dotenv.config({path:'./.env'})

const web = require('./routes/web')
const connectDb = require('./Db/connectDb')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const cors = require('cors')




app.use(fileUpload({useTempFiles:true}))
// app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors())
app.use(flash())
connectDb()
app.use('/api',web)

//server create
app.listen(process.env.PORT,()=>console.log(`server running on localhost  ${process.env.PORT}`))


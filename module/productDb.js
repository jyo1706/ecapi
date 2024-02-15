const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
    product_name:
    {
        type:String,
        required:true,
    },
     description:
    {
       type:String,
       required:true,
    },
    price:
    {
        type:Number,
        required:true,
    },
    stock:
    {
        type:Number,
        required:true,
        default:1
    },
    numOfReviews:
    {
      type:Number,
      required:true,
      default:1
    },
    image:
    {
         public_id:
         {
            type:String,

         },
         url:
         {
         type:String
         }
     },
     category:
     {
        type:String,
        required:true,
     }

},{timestamps:true})
const ProductModel = mongoose.model('product',ProductSchema)
module.exports = ProductModel
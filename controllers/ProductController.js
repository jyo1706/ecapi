const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'deqjjzjbh', 
    api_key: '618227314277568', 
    api_secret: 'UUvM_uxm9lm5RiaXw_5zgwwlIQs' 
  });
const ProductModel = require('../module/productDb')
class ProductController 
{
   static productinsert = async(req,res)=>
   {
    try 
    {
       const img = req.files.image;
       const image = await cloudinary.uploader.upload(img.tempFilePath,{
        folder:'emcommerce'
       })
  
       const product = await ProductModel({
        product_name:req.body.product_name,
        description:req.body.description,
        price:req.body.price,
        stock:req.body.stock,
        category:req.body.category,
        numOfReviews:req.body.numOfReviews,
        image:{
            public_id:image.public_id,
            url:image.url
        }
       })
       await product.save();
       res.status(200).json({sucess:true,product})
    } 
    catch (error) 
    {
      console.log(error)    
    }
   }
   static display = async(req,res)=>
   {
    try 
    {
        const data = await ProductModel.find()
        res.status(200).json({sucess:true,data}) 
    }
    catch (error) 
    {
       console.log(error)    
    }
   }

     static view =async(req,res,id)=>
    {
        try 
        {
         const data = await ProductModel.findById(req.params.id)
         res.status(200).json({sucess:true,data})
            
        } 
        catch (error) 
        {
            
        }
    }
    static delete = async(req,res,id)=>
   {
    try
    {
        const data = await ProductController.findByIdAndDelete(req.params.id)
        res.status(200).json({sucess:true,data})
    }
    catch(error)
    {
        console.log(error)
    }
   }
    
   static update = async(req,res,id)=>
   {
   try
   {
    if(req.files)
    {
        const data = await ProductModel.findById(req.params.id)
        // console.log(data)
        const img = data.image.public_id
        //  console.log(img)
        const deleteimage = await cloudinary.uploader.destroy(img)

        const image = req.files.image;
        console.log(image)
        const newimage = await cloudinary.uploader.upload(image.tempFilePath,{
            folder:'emcommerce'
        })
        // console.log(newimage)
        var updateimgdata =
        {
            product_name:req.body.product_name,
            description:req.body.description,
            stock:req.body.stock,
            numOfReviews:req.body.numOfReviews,
            price:req.body.price,
            image:{
                public_id:newimage.public_id,
                url:newimage.url
            },
            category:req.body.category
        } 
    }
    else
    {
        var updateimgdata = {
            product_name:req.body.product_name,
            description:req.body.description,
            stock:req.body.stock,
            numOfReviews:req.body.numOfReviews,
            price:req.body.price, 
            category:req.body.category  
        }
    }
    var data = await ProductModel.findByIdAndUpdate(req.params.id,updateimgdata)
    await data.save()
    res.status(200).json({sucess:true,data})
   }
   
   catch(error)
   {
    console.log(error)
   }
}
   
}

module.exports = ProductController

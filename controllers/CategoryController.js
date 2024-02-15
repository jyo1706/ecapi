const CategoryModel = require('../module/categoryDb');

const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'deqjjzjbh', 
    api_key: '618227314277568', 
    api_secret: 'UUvM_uxm9lm5RiaXw_5zgwwlIQs' 
  });
class CategoryController
{
     static home = async(req,res)=>
     {
        try {
            res.render('Category/category')
        } 
        catch (error) 
        {
            console.log(error)    
        }
     }
     static insert = async(req,res)=>
     {
        const image =  req.files.image;
        console.log(image)
        const img = await cloudinary.uploader.upload(image.tempFilePath,{
            folder:'emcommerce'
        })
        // console.log(img)
        try {
           
            const data = new CategoryModel({
                    category_name:req.body.category_name,
                    image:
                    {
                        public_id:img.public_id,
                        url:img.url
                    }
                })
             await data.save()
            res.redirect('/categorydisplay')
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
            const data = await CategoryModel.find()
            res.status(200)
            .json({sucess:true,data})

            // res.render('Category/categoryDisplay',{d:data}) 
        } 
        catch (error)
         {
            console.log(error)
        }
     }
     static delete = async(req,res,id)=>
     {
        console.log(req.params.id)
        try
        {
           const data =  await CategoryModel.findByIdAndDelete(req.params.id)
           res.status(200).json({success:true,data})
        //    res.redirect('/categorydisplay')
        }
        catch(error)
        {
            console.log(error)
        }
     }
     static edit = async(req,res,id)=>
     {
        // console.log(req.params.id)
        try 
        {
            const data = await CategoryModel.findById(req.params.id)
            res.status(200).json({sucess:true,data})
            // console.log(data)
            // res.render('Category/categoryEdit',{d:data})
        }
        catch (error)
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
            const data = await CategoryModel.findById(req.params.id)
            const img = data.image.public_id
            const dl = await cloudinary.uploader.destroy(img)
            const newdata = req.files.image
            const newUpload = await cloudinary.uploader.upload(newdata.tempFilePath,{
                folder:"emcommerce"
            })
            var imgdata = {
                category_name:req.body_category_name,
                image:{
                    public_id:newUpload.public_id,
                    url:newUpload.url
                }
                
            }
        }
        else
        {
            var imgdata = {
                category_name:req.body.category_name
            }
            
        }
        const up = await CategoryModel.findByIdAndUpdate(req.params.id,imgdata)
        await up.save();
        res.status(200).json({success:true,up})
        // res.redirect('/categorydisplay')
    }
            
           
          
          
        catch (error) 
        {
          console.log(error)    
        }
     }
}

module.exports=CategoryController

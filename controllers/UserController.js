const cloudinary = require("cloudinary").v2;
const userModel = require("../module/userDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
cloudinary.config({
  cloud_name: "deqjjzjbh",
  api_key: "618227314277568",
  api_secret: "UUvM_uxm9lm5RiaXw_5zgwwlIQs",
});

class UserController {
  static home = async (req, res) => {
    try {
      // res.render('registration')
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };
  static insert = async (req, res) => {
    const { name, email, password, cpassword, mobile } = req.body;
    const img = req.files.image;
    const file = await cloudinary.uploader.upload(img.tempFilePath, {
      folder: "emcommerce",
    });
    // console.log(file)
    if (name && email && password && cpassword && mobile) {
      const checkEmail = await userModel.findOne({ email: email });
      // console.log(checkEmail);
      if (checkEmail) {
        res.status(409).json({ sucess: true, message: "Email already exit" });
      } else {
        if (password == cpassword) {
          try {
            const pass = password;
            const cpass = cpassword;
            const hashpassword = await bcrypt.hash(pass, 10);
            const hashcpass = await bcrypt.hash(cpass, 10);
            // console.log(req.body)

            const user = new userModel({
              name: name,
              email: email,
              password: hashpassword,
              cpassword: hashcpass,
              mobile: mobile,
              image: {
                public_id: file.public_id,
                url: file.url,
              },
            });
            await user.save();
            res.status(200).json({ success: true, user });
            // res.redirect('/');
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(401).json({
            success: true,
            message: "password and cpassword are not match",
          });
        }
      }
    } else {
      res
        .status(400)
        .json({ success: "failed", message: "All fields are required" });
    }
  };
  static display = async (req, res) => {
    try {
      const display = await userModel.find();
      console.log(display);
      res.status(402).json({ sucess: true, display });
    } catch (error) {
      console.log(error);
    }
  };
  static loginverify = async (req, res) => {
    const { email, password } = req.body;

    try 
    {
      if (email && password) {
        const data = await userModel.findOne({ email: email });
        if (data) {
          const verifypassword = await bcrypt.compare(password, data.password);

          if (verifypassword) {
            const token =  jwt.sign({ ID: data._id }, "jyo@345");
            // console.log(token)
            res.cookie("token", token);
            res
              .status(201)
              .json({ success: true, message: "login successfully",data});
            
             
          } else {
            res
              .status(401)
              .send({ status: true, message: "password not coreect" });
          }
        } else {
          res
            .status(785)
            .send({ success: true, message: "Email does'nt Exit" });
        }
      } else {
        res
          .status(400)
          .send({ success: true, message: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  static getuserdetail = async(req,res)=>
    {
      try
      {
       const {id,name,email,image} = req.data
        const user = await userModel.findById(req.data.id)
        // consoe.log("heelo auth")
        res.status(201).json({
          status:'success',
          message:'successfully',
          user
        
      })
      }
      catch(error)
      {
        console.log(error)
      }
    }
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res
        .status(200)
        .json({ status: "Success", message: "Logout Successfully" });
    } catch (error) {
      console.log(error);
    }
  };
   static change_password = async (req, res) => {
    try {
      const { name, email, id, image } = req.data;
      // console.log(req.body)
      const { oldpassword, newpassword, cpassword } = req.body;
      if (oldpassword && newpassword && cpassword) {
        const user = await userModel.findById(id);
        const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          res
            .status(401)
            .json({ status: "Failed", message: "Old Password is incorrect" });
        } else {
          if (newpassword !== cpassword) {
            res
              .status(401)
              .json({
                status: "Failed",
                message: "Password and confirm password is not matched",
              });
          } else {
            const newHashpassword = await bcrypt.hash(newpassword, 10);
            await userModel.findByIdAndUpdate(id, {
              $set: { password: newHashpassword },
            });

            res
              .status(201)
              .json({
                status: "Success",
                message: "Password Change successfully",
              });
          }
        }
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "All field are required" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static profile_update = async (req, res) => {
    try {
      const {id,email,name,image}=req.data
      //console.log(req.files.image)
      if (req.files) {
        const user = await userModel.findById(req.data.id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "emcommerce",
        });
        var data = {
          name: req.body.name,
          email: req.body.email,
          mobile:req.body.mobile,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };
      } else {
        var data = {
          name: req.body.name,
          email: req.body.email,
           mobile:req.body.mobile,
        };
      }
      const update_profile = await userModel.findByIdAndUpdate(
        req.data.id,
        data
      );
      res.status(200)
          .json({ status: "update", message: "update file" });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserController;

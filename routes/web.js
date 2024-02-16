const express =  require('express')
const  UserController  = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');
const auth= require('../middleware/authcheck')
const router = express.Router()

//user

router.get('/',UserController.home);
router.post('/resinsert',UserController.insert)
router.get('/userdisplay',UserController.display)
router.post('/loginverify',auth,UserController.loginverify)

//Category

router.get('/category',CategoryController.home)
router.post('/categoryinsert',CategoryController.insert)
router.get('/categorydisplay',CategoryController.display)
router.get('/categorydelete/:id',CategoryController.delete)
router.get('/categoryedit/:id',CategoryController.edit)
router.post('/categoryupdate/:id',CategoryController.update)

//product 
router.post('/productinsert',ProductController.insert)
router.get('/productdisplay',ProductController.display)
router.post('/productupdate/:id',ProductController.update)

module.exports = router

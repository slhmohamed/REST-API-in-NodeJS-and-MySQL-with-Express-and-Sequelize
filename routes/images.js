const express=require('express')
const imageController=require('../controllers/image.controller')
const checkAuth=require('../middleware/check.auth')
const imageUploader=require('../helpers/image-uploader')

const router =express.Router();

router.post('/uplaods',imageUploader.upload.single('image'),imageController.upload)

module.exports=router
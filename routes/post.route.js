const express=require('express')
const postController=require('../controllers/post.controller')
const router=express.Router()
const validate = require("../middleware/validate");
const {validatePost}=require('../helpers/validator')

const checkAuthMiddleware=require('../middleware/check.auth')
router.post('/addPost',checkAuthMiddleware.checkAuth,[validate(validatePost)],postController.save)
router.get('/getPost/:id',postController.getSingle)
router.get('/getAll',postController.getAll)

router.put('/updatePost/:id',postController.updatePost)

router.delete('/deletePost/:id',postController.deletePost)
module.exports=router
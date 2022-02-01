const models=require('../models')
const {validatePost}=require('../helpers/validator')
const save= (req,res,next)=>{
const post={
    title:req.body.title,
    content:req.body.content,
    imageUrl:req.body.imageUrl,
    categoryId:req.body.categoryId,
    userId:1

}
 

models.Post.create(post).then((result) => {
    res.status(200).json({
        message:"Post created successfully",
        Post:post
    })
}).catch((err) => {
    res.status(400).json({
        message:'Somthing went wrong',
        error:err.message
    })
}) 
}

const getSingle=(req,res,next)=>{

    const id=req.params.id
    models.Post.findByPk(id).then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
              res.status(200).json({
                  message:"No post with this ID"
              })
        }
      
    }).catch(err=>{
        res.status(400).json(err.message)
    })
}

const getAll=(req,res,next)=>{
    models.Post.findAll().then(result=>{
        if(result){
        res.status(200).json(result)
        }else{
            res.status(200).json({message:"No post exist"}) 
        }
    }).catch(err=>{
        res.status(400).json(err.message)
    })
}

const updatePost=(req,res,next)=>{
    const id=req.params.id;
    const updataPost={
        title:req.body.title,
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId
    }

    const userId=1;

    models.Post.update(updataPost,{where :{id:id,userId:userId}}).then(result=>{
        res.status(200).json({
            message:"Post updated successfully",
            post:result
        })
    }).catch(err=>{
        res.status(400).json({
            message:"Something went wrong",
            error:err.message})
    })
}
const deletePost=(req,res,next)=>{
    const id =req.params.id

    models.Post.destroy({where:{id:id}}).
    then(result=>{
        res.status(200).json({
        message:"Post deleted successfully",
       
    })}).catch(err=>{

        res.status(400).json({
            message:"Something went wrong",
            error:err.message})
    })
}
module.exports={
    save,
    getSingle,
    getAll,
    updatePost,
    deletePost
}
const models = require('../models')

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const signUp = (req, res, next) => {
    console.log(req.body);
    models.User.findOne({ where: { email: req.body.email}}).then(result => {
        
        
        if (result) {
           
            res.status(400).json({
                message: 'Email already exist!'
            })
        } else {
       
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(req.body.password, salt, (err, hash) => {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                    models.User.create(user).then((result) => {
                        res.status(200).json({
                            message: 'User created succeffly',
                            user: user
                        })
                    }).catch((err) => {
                        res.status(400).json({ error: err.message })
                    });
                })
            })
        }
    }).catch(err => {
        res.status(400).json({
            
            message: "Somthing went wrong !",
            error:err.message
        })
    })


}
const signIn=(req,res,next)=>{
    models.User.findOne({where:{email:req.body.email}}).then(user=>{
        if(user===null){
            res.status(401).json({
                message:'User with that email does not exist. Please signup'
            })
        }else{
            bcryptjs.compare(req.body.password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({
                        email:user.email,
                        userId:user.id

                    },process.env.JWT_SECRET,{expiresIn:'5m'},(err,token)=>{
                        res.status(200).json({
                            message:'Authentication successful!',
                            token:token
                        })
                    })
                }else{
                    res.status(401).json({
                        message:'Email and password do not match'
                    })
                }
            })
        }
    }).catch(err=>{
        res.status(400).json({
            message:"Somthing worng",
            error:err.message
        })
    })
}
module.exports = {
    signUp,
    signIn
}
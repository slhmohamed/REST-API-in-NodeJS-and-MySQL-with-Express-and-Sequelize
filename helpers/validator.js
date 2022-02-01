const Joi = require("joi");
 function validatePost(new_post){
    const schema = {
      title: Joi.string().min(3).max(50).required(),
      content: Joi.string().min(100).max(500).required(),
      categoryId:Joi.number().required(),
    }
    return Joi.validate(new_post, schema);
  }
   
  module.exports={
      validatePost:validatePost
  }
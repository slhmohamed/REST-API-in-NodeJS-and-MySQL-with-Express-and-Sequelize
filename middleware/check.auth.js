const jwt=require('jsonwebtoken')

function checkAuth(req,res,next){
    const token=req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied!:No token provided');
    try{

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        req.userData=decodedToken;
 
        next()
    }
    catch(e){
        return res.status(401).json({
            'message':"Invalid or expired token provided",
            'error':e.message
        })
    }
}

module.exports={
    checkAuth:checkAuth
}
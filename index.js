const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors');

const port = process.env.PORT || 3000;
const app=express()
const dotenv = require('dotenv');
dotenv.config();
app.use(cors("**"))
const postRoute=require('./routes/post.route')
const userRoute=require('./routes/user.route')
const imageRoute=require('./routes/images')
app.use(bodyParser.json())
app.use("/api/post",postRoute)
app.use("/api/user",userRoute)
app.use("/api/image",imageRoute)

app.use('/uploads',express.static('uploads'))


//app.use('/api',studentRouter.router);

app.listen(port,()=>console.log('App is listening on PORT ' +port))
import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    const JWT_SECRET = "random#secret"
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"No token found!"})
    }
    try{
        const token_decoded = jwt.verify(token,JWT_SECRET)
        req.body.userId = token_decoded.id
        next()
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}

export default authMiddleware
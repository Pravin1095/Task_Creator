
const jwt = require('jsonwebtoken');
module.exports= (req, res, next)=>{
    if(req.method==='OPTIONS'){
        return next()
    }
try{
    console.log("check token", req )
    const authHeader = req?.headers['authorization'] //Authorization : 'Bearer' 'Token'
    if(!authHeader){
        throw new Error('Authorization Failed')
    }
    else{
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret_dont_share');
        req.userData = {userId : decodedToken.userId}
        next()
    }
}
catch(err){
    res.status(401).json({message : 'Authentication Failed!'})
    return next(err)
}
}
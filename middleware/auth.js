const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req,res,next){
    //get token from header
    const token = req.header("x-auth-token");

    //check if not token

    if (!token) {
        res.status(401).json({msg: "Invalid token"});
    }else{
        try {
            const decoded =jwt.verify(token,config.get("jwtSecret"));
            req.userInfo = decoded.userIdentity;
            next();
        } catch (err) {
            console.log(err.message);
            res.status(401).json({msg:"invalid Token"});
        }
    }
}


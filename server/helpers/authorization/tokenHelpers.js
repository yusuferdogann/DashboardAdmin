const sendJwtToClient = (user,res ) =>{

    const token = user.genereteJwtFromUser();

    const {JWT_COOKIE,NODE_ENV} = process.env;
    return res.status(200)
    .cookie("access_token",token,{
        httpOnly:true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
        secure : true
    })
    .json({
        success:true,
        access_token:token,
        data:{
            username:user.username,
            email:user.email,
            password:user.password
        }
    })
}

const isTokenIncluded = (req)=>{
    console.log("authorization",req.headers.authorization)
    return req.headers.authorization 
}

const getAccessTokenFromHeader = (req) =>{
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}
module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};
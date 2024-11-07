const CustomError = require("../../helpers/error/CustomError")
const jwt = require("jsonwebtoken");
const {isTokenIncluded} = require("../../helpers/authorization/tokenHelpers")
const {getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers")

const getAccessToRoute = (req,res,next)=>{

    // console.log(req.headers.authorization);
const {JWT_SECRET_KEY} = process.env;
    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route",401))
    }
    const accessToken = getAccessTokenFromHeader(req)

    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        if (err) {
            return next(new CustomError("You are not autherized to access this route",401))
        }
        req.user = {
            id:decoded.id,
            name:decoded.username
        }
        next()

    })
    
}


// const getAccessToRoute =  (req,res,next) => {
//     const {JWT_SECRET_KEY} = process.env;

//         const authorization = req.headers.authorization;
//         console.log("ttttt--------",authorization?.split(' ')[1])
//         access_token =  authorization?.split(' ')[1];

//     console.log("TOKEN---------------------",access_token)
//     jwt.verify(access_token,JWT_SECRET_KEY,(err,decoded)=>{
//               if (err) {
//                   return next(new CustomError("You are not autherized to access this route",401))
//               }
//               req.user = {
//                   id:decoded.id,
//                   name:decoded.username
//               }
//               next()
      
//           })
//   };
  

module.exports = {
    getAccessToRoute
}
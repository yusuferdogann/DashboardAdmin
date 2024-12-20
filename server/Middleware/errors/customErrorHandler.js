const CustomError = require("../../helpers/error/CustomError")
const customErrorHandler = (err,req,res,next)=>{
    console.log(err)
    let customError = err;

    if (err.name === 'SyntaxError'){
        customError = new CustomError("Unexpected Syntax",400)
    }

    if(err.name === 'ValidationError'){
        customError = new CustomError(err.message,400);
    }
    if(err.code === 11000)
        next()



    res
    .status(customError.status || 500)
    .json({
        success:false,
        message:customError.message || "Internal Server Error"

    })
}

module.exports = customErrorHandler;
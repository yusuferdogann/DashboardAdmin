const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require("./config/database.js");
const bodyParser = require("body-parser");
const authRouter = require("./routes/AuthRouter.js")
const ProductRouter = require("./routes/ProductRouter.js")
const routers = require('./routes/AuthRouter.js');
var httpContext = require('express-http-context');
const customErrorHandler = require("./Middleware/errors/customErrorHandler.js");
const cookieParser = require("cookie-parser");




const app = express();
dotenv.config();

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json({ limit: '50mb' }));
// middleware



app.use('/api',routers)

app.use(httpContext.middleware);

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(cookieParser());
app.use(bodyParser.json())
// app.use(cors({
//     origin:'http://localhost:5173',
//     credentials:true
// }));
app.use(cors());



const PORT =  3000;


app.get("/yusuf",(req,res)=>{
    res.send("selam")
})


app.use("/auth",authRouter)
app.use("/products",ProductRouter)




database();

// Error Handler
app.use(customErrorHandler)
// Static Files
// app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(__dirname +'/'));



//app.listen(()=>{
//    console.log("server is running", 3001);
//})
app.listen(3000,()=>{
    console.log("server is running");
})


module.export = app;
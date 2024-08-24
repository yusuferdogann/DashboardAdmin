const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require("./config/database.js");
const bodyParser = require("body-parser");
const authRouter = require("./routes/AuthRouter.js")
const ProductRouter = require("./routes/ProductRouter.js")
const routers = require('./routes/AuthRouter.js');




const app = express();
dotenv.config();

app.use(express.json());
// middleware
app.use(cors());
app.use('/api',routers)



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const PORT =  3000;











app.post("/yusuf",(req,res)=>{
    console.log(req.body)
})



 


app.use("/auth",authRouter)
app.use("/products",ProductRouter)


database();

app.listen(PORT,()=>{
    console.log("server is running",PORT);
})
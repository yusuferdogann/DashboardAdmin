const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require("./config/database");
const bodyParser = require("body-parser");
const authRouter = require("./routes/AuthRouter.js")
const ProductRouter = require("./routes/ProductRouter.js")



const app = express();

const PORT =  5000;


dotenv.config();


// middleware
app.use(express.json())

app.use(bodyParser.json());
app.use(cors());




 


app.use("/auth",authRouter)
app.use("/products",ProductRouter)


database();

app.listen(PORT,()=>{
    console.log("server is running",PORT);
})
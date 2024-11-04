const mongoose = require('mongoose')



const database = () =>{
 

    
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology: true
            
        }).then(()=>{
            console.log("mongooDB connected");
        }).catch((err)=>{
            console.log(err);
        })
}

module.exports = database


// const {Pool} = require("pg");

// const pool = new Pool({
//     host:"localhost",
//     user:"postgres",
//     password:"yusuf1905",
//     port:5432,
//     database:"yt_login_system"
// })
// const createTblQry = `CREATE TABLE accounts (
// user_id serial PRIMARY KEY,
// username VARCHAR (50) UNIQUE NOT NULL,
// password VARCHAR (50) UNIQUE NOT NULL)`

// pool
// .query(createTblQry)
// .then((response)=>{
//     console.log("Database Created")
//     console.log(response)
// })
// .catch((err)=>{
//     console.log(err)
// })

// module.exports = pool;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database.js");
const authRouter = require("./routes/AuthRouter.js");
const productRouter = require("./routes/ProductRouter.js");
// const mainRouter = require("./routes/MainRouter.js"); // Ana router dosyan
const httpContext = require("express-http-context");
const customErrorHandler = require("./Middleware/errors/customErrorHandler.js");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// CORS Middleware (Tüm HTTP metotlarına izin verildi)
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

// JSON ve URL-encoded verileri kabul et (body-parser yerine express.json kullan)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Cookie Parser
app.use(cookieParser());

// HTTP Context Middleware
app.use(httpContext.middleware);

// Ana Router Yapısı
// app.use("/api", mainRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);

// Test Route
app.get("/yusuf", (req, res) => {
    res.send("selam");
});

// Veritabanı Bağlantısı
database();

// Error Handler
app.use(customErrorHandler);

// Server Başlatma
// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

module.exports = app;

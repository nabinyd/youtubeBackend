import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: "./env"
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server listening at: http://localhost:${process.env.PORT}/api/v1/users`)
    })
}).catch((error)=>{console.log("mongodb  connection failed");})




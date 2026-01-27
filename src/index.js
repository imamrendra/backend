import dotenv from "dotenv";
dotenv.config();
import {app} from './app.js'
import connectDB from "./db/index.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is runnig at :
            ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection failed !!!",err)
})













/*
import express from express;
const app =express();

;( async()=>{
    try {
        await mongoose.connect(`${peocess.env.
        MONGODB_UR}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Err::",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port $
            {process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error Occurred", error);
    }
})();

*/


import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"
import cookieParser from 'cookie-parser'

const app = express()

const connect = () => {
    mongoose
    .connect("mongodb://127.0.0.1:27017/YOUTUBE")
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        throw err
    })

}

// cookie-parser middleware
app.use(cookieParser())
// parser middleware
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)

//error handler middleware
app.use((err, eq, res, next)=> {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})


app.listen(8800, ()=> {
    connect()
    console.log("connected")
})
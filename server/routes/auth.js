


import express from "express";
import {signup, signin, google} from "../controllers/auth.js"

const router = express.Router()


//signup
router.post("/signup", signup)

//login
router.post("/signin", signin)


//google login
router.post("/google", google)




export default router;
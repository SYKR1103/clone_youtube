


import express from "express";
import {addVideo, updateVideo, deleteVideo, getVideo, addviewVideo, getviewVideo, trend, random} from "../controllers/videos.js"
import { verifyToken } from "../VerifyToken.js";


const router = express.Router()

//create video
router.post("/", verifyToken, addVideo)

//update video
router.put("/:id", verifyToken, updateVideo)

//delete video
router.delete("/:id", verifyToken, deleteVideo)

//create video
router.get("/find/:id", getVideo)

//views of video
router.put("/view/:id", addviewVideo)

//views of video
router.get("/view/:id", getviewVideo)

//views of video
router.get("/trend", trend)

//views of video
router.get("/random", random)

export default router;
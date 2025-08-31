import express from "express"
import { registerApp } from "../controllers/github.controllers.js"

const router = express.Router()

router.get("/callback", registerApp)

export default router;
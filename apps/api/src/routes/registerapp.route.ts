import express from "express"
import { registerApp } from "../controllers/registerapp.controllers.js"

const router = express.Router()

router.get("/callback", registerApp)

export default router;
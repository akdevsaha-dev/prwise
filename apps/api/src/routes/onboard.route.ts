import express from "express"
import { finishOnboarding } from "../controllers/onboard.controllers.js"

const router = express.Router()

router.post("/onboarding/finishOnboarding", finishOnboarding)

export default router;

import express from "express"
import { finishOnboarding, workspaceSetup } from "../controllers/onboard.controllers.js"

const router = express.Router()

router.post("/onboarding/workspace-setup", workspaceSetup)
router.post("/onboarding/finishOnboarding", finishOnboarding)

export default router;

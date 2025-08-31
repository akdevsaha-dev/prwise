import express from "express"
import { workspaceSetup } from "../controllers/workspace.controllers.js";

const router = express.Router()
router.post("/onboarding/workspace-setup", workspaceSetup)
export default router;
import express from "express"
import { getInstallationDetails } from "../controllers/github.controllers.js"

const router = express.Router()

router.get("/:workspaceId", getInstallationDetails)

export default router
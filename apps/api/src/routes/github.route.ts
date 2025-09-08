import express from "express"
import { deleteInstallation, getInstallationDetails } from "../controllers/github.controllers.js"

const router = express.Router()

router.get("/:workspaceId", getInstallationDetails)
router.delete("/:workspaceId", deleteInstallation)


export default router
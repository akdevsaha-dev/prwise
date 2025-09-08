import express from "express"
import { getRepositories } from "../controllers/repo.controllers.js";

const router = express.Router()

router.get("/repositories/:workspaceId", getRepositories)

export default router;
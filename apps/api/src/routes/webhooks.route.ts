import express from "express"
import { webhookEvent } from "../controllers/webhooks.controllers.js";

const router = express.Router()

router.post('/webhook', webhookEvent)
export default router;
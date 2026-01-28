import express from "express";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controller/message.controller";
import { protectRoute } from "../middleware/auth.middleware.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js"

const router = express.Router();

router.use(arcjetprotection ,protectRoute)

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners)
router.get("/:id", getMessagesByUserId)
router.post("/send/:id", sendMessage)

export default router;
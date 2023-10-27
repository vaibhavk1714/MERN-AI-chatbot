import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, getAllChats, deleteChats } from "../controllers/chat-controllers.js";
const chatRoutes = Router();
// Protected APIs - only after login
chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get('/all-chats', verifyToken, getAllChats);
chatRoutes.delete('/delete', verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map
import { Router } from "express";


import { getMessagesBetweenUsers } from "../controllers/chat.controllers.js";
import { createMessage } from "../controllers/chat.controllers.js";

const chatRoutes = Router();   

chatRoutes.get('/gm', getMessagesBetweenUsers);
chatRoutes.post('/cm', createMessage);

export default chatRoutes;
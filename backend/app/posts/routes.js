import express from'express';
const router = express.Router();
import { addPost } from "./controller.js";
import { authorizeMW } from '../auth/controller.js';

router.post('/', authorizeMW, addPost);

export default router;
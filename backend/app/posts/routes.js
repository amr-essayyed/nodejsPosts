import express from'express';
const router = express.Router();
import { addPost } from "./controller.js";

router.post('/', addPost);

export default router;
import express from'express';
const router = express.Router();
import { addPost, getPosts } from "./controller.js";
import { authorizeMW } from '../auth/controller.js';
import { get } from 'mongoose';

router.post('/', authorizeMW, addPost);
router.get('/', getPosts)
export default router;
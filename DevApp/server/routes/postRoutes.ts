import { createPost, deletePostById, getAllPosts, getPostById, getPostByUserId } from "../controllers/postController";
import { verifyToken } from "../middlewares/verifyToken";
const express = require('express')

const router = express.Router();

router.post('/create', createPost);
router.get('/', getAllPosts);
router.get('/user/:id', verifyToken, getPostByUserId);
router.get('/:id', getPostById);
router.delete('/:id', deletePostById);

export default router;
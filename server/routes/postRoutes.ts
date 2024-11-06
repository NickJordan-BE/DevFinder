import { createPost, deletePostById, getAllPosts, getPostById, getPostByUserId } from "../controllers/postController";

const express = require('express')

const router = express.Router();

router.post('/create', createPost);
router.get('/', getAllPosts);
router.get('/user/:id', getPostByUserId);
router.get('/:id', getPostById);
router.delete('/:id', deletePostById);

export default router;
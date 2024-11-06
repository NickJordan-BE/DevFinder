import { Request, Response } from "express"
import { Post, PostModel } from "../models/posts"
import { QueryResult } from "pg";

export const createPost = async (req: Request, res: Response) => {
    const { title, description, tags, techTags, user}= req.body;

    try {
        const post: Post = await PostModel.createPost(title, description, tags, techTags, user.id)
        if(!post) {
            res.status(400).json({
                success: false,
                message: "Post Not Found"
            })
        }

        res.status(201).json({
            status: "success",
            data: {
                post: post
            }
        })
    }catch (err: any) {
        res.status(500).json({
            message: "An Error Occurred"
        })
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    
    try {
        const result: QueryResult = await PostModel.getAllPosts();

        if(!result) {
            res.status(400).json({
                message: "Retrieval Unsuccessful"
            })
        }

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                posts: result.rows
            }
        })
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "An Error Occurred"
        }) 
    }
}

export const getPostByUserId = async (req: Request, res: Response) => {
    try {
        const post: QueryResult = await PostModel.getPostByUserId(req.body.user.id)

        if (!post) {
            res.status(400).json({
                message: "Retrieval Unsuccessful"
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                posts: post.rows
            }
        })
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "An Error Occurred"
        })
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {

        const post: Post = await PostModel.getPostById(req.params.id);

        if (!post) {
            res.status(400).json({
                message: "Retrieval Unsuccessful"
            })
        }

        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "An Error Occurred"
        })
    }
}

export const deletePostById = async (req: Request, res: Response) => {
    try {

        const result: QueryResult = await PostModel.deletePostById(req.params.id);
        
        if(result.rowCount === 0) {
            res.status(400).json({
                status: "failed",
                message: "Post does not exist"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Post Deleted"
        })
    } catch (err: any) {
        console.log(err)
        res.status(500).json({
            status: "failed",
            message: "An Error Occurred"
        })
    }
}
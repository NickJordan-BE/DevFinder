import { QueryResult } from "pg";

const db = require('../config/db')

export interface Post {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    tags: string[]
    tech_stack_tags: string[]
    userId: number;
}

export const PostModel = {
    getAllPosts: async () => {
        try {
            const result: QueryResult = await db.query('SELECT * FROM project_posts');
            return result;
        } catch(err: any) {
            return err;
        }
    },

    createPost: async (title: string, description: string, tags: string[], techTags: string[], userId: Number) => {
        try {
            const query: string = "INSERT INTO project_posts (title, description, tags, tech_stack_tags, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
            const queryArgs: (string | Number | string[])[] = [title, description, tags, techTags, userId];
            const result: QueryResult = await db.query(query, queryArgs);

            return result.rows[0];
        } catch (err: any) {
            return err;
        }
    },

    getPostByUserId: async (userId: Number) => {
        try {
            const post: QueryResult = await db.query("SELECT * FROM project_posts WHERE user_id = $1", [userId]);

            return post;
        } catch (err: any) {
            return err;
        }
    },

    deletePostById: async (id: string) => {
        const result: QueryResult = await db.query("DELETE FROM project_posts WHERE id = $1", [id]);
        return result;
    },

    getPostById: async (id: string) => {
        try {
            const post: QueryResult = await db.query("SELECT * FROM project_posts WHERE id = $1", [id]);
            return post.rows[0];
        } catch (err: any) {
            return err
        }
    }
}
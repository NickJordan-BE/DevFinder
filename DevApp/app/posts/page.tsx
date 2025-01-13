import { Post } from "../../server/models/posts";
import PostsFinder from "../api/PostsFinder";
import React from "react"
import PostsList from "../components/PostsList"
import { AxiosResponse } from "axios";


const posts = async () => {
    try {
        const result: AxiosResponse = await PostsFinder.get("/")
        const posts: Post[] = result.data.data.posts

        return (
            <>
                <h1 className="text-center">Posts</h1>
                <PostsList posts={posts} />
            </>
        )
    } catch (err: any) {
        console.log(err)
        return (
            <div>Error Loading Posts</div>
        )
    }
        
        
}

export default posts;
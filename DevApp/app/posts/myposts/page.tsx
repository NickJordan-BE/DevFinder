import { Post } from "../../../server/models/posts"
import PostsFinder from "../../api/PostsFinder";
import React from "react"
import PostsList from "../../components/PostsList"


const myposts = async () => {
    try {
        const id = 3
        const result = await PostsFinder.get(`/user/${id}`)
        const posts: Post[] = result.data.data.posts

        return (
            <>
                <h1 className="text-center mt-3">My Posts</h1>
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

export default myposts;

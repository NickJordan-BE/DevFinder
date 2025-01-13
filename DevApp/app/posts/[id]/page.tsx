import PostsFinder from '@/app/api/PostsFinder'
import SinglePost from '@/app/components/SinglePost'
import { Post } from '@/server/models/posts'
import { AxiosResponse } from 'axios'
import React from 'react'

const Page = async ({ params, }: { params: Promise<{ id: string }> }) => {
    try {
        const id: string = (await params).id
        const result: AxiosResponse = await PostsFinder.get(`${id}`)
        const post: Post = result.data.post

        return (
            <>
            <SinglePost post={post}/>
            </>
        )
    } catch (err: any) {
        console.log(err)
        return (
            <h1>Error Loading Post</h1>
        )
    }
}

export default Page;




'use client'
import React from 'react'
import { withAuth } from './WithAuth';
import { Post } from '@/server/models/posts';

export interface PostProps {
  post: Post
}

const SinglePost: React.FC<PostProps> = ({ post })  => {

  return post ? 
    <div>
      <div>
          <h1>{post.title}</h1>
          <h2>{post.created_at.toString()}</h2>
          <h4>{post.tags.map((tag) => {
              return (
                  <span key={tag}>#{tag}, </span>
              )
          })}</h4>
          <h4>{post.tech_stack_tags.map((tag) => {
              return (
                  <span key={tag}>#{tag}, </span>
              )
          })}</h4>
          <p>{post.description}</p>
      </div> 
    </div>
    :
    <div>
      <h1>Error Loading Post</h1>
    </div>
}

export default withAuth(SinglePost);

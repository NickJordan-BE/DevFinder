"use client"
import { Row, Col, Card, Button } from "react-bootstrap";
import { Post } from "../../../server/models/posts"
import Link from "next/link";
import React, { useEffect, useState } from "react"

interface PostsProps {
    posts: Post[];
  }

const PostsList: React.FC<PostsProps> = ({ posts }) => {

    return (

        <Row>
            {posts && posts.map((post: Post) => {
                return (
                    <Col key={post.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.description}
                                    <br></br>{post.tags.map((tag) => {
                                        return (<span key={tag}>#{tag}, </span>)})}
                                    <br></br>{post.tech_stack_tags.map((tag) => {
                                        return (<span key={tag}>#{tag}, </span>)})}
                                </Card.Text> 
                                <Button variant="primary"><Link className="text-white text-decoration-none" href={`/posts/${post.id}`}>Learn More!</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )})
            }
        </Row>  
        )
}

export default PostsList

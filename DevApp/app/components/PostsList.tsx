"use client"
import { Row, Col, Card, Button } from "react-bootstrap";
import { Post } from "../../server/models/posts";
import Link from "next/link";
import React from "react"
import { withAuth } from "./WithAuth";

export interface PostsProps {
    posts: Post[];
}

const PostsList: React.FC<PostsProps> = ({ posts }) => {

    return (

        <Row>
            {posts && posts.map((post: Post) => {
                return (
                    <Col key={post.id} md={4} className="mb-4">
                        <Card className="m-1 bg-dark bg-gradient shadow-lg">
                            <Card.Body className="text-center text-white m-1">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text className="m-4">{post.description}
                                    <br></br>{post.tags.map((tag) => {
                                        return (<span key={tag}>#{tag}, </span>)})}
                                    <br></br>{post.tech_stack_tags.map((tag) => {
                                        return (<span key={tag}>#{tag}, </span>)})}
                                </Card.Text> 
                                <Button variant="primary"><Link className="text-white text-decoration-none mt-5" href={`/posts/${post.id}`}>Learn More!</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )})
            }
        </Row>  
        )
}

export default withAuth(PostsList);

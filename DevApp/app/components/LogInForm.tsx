'use client'
import React from "react";
import Link from "next/link";
import { useState } from 'react'
import { Button, Container, Form, Alert } from "react-bootstrap";
import Authorization from "../api/Authorization"
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';


const LogInForm = () => {
    const { setAuth } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await Authorization.post("/login", {
              identifier,
              password
            }, 
            {
                headers: { 'Content-type' : 'application/json'},
                withCredentials: true
            });

            if (response.status === 201) {
                setIdentifier('');
                setPassword('');
            }

            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;

            setAuth({ accessToken, user});
            router.push('/');

          } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.message || "User Login Failed");
          }
    }

    return (
        <Container className="mt-5 w-75">
            <h1 className="text-center display-3">Sign In</h1>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mt-5">
                        <Form.Label>Username or Email</Form.Label>
                        <Form.Control name="identifier" onChange={e => setIdentifier(e.target.value)} type="text" placeholder="Enter Username or Email" required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="formPassword" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" required></Form.Control>
                    </Form.Group>
                        
                    <div className="text-center mt-5">
                        <Button variant="primary btn-lg" type="submit">Sign In</Button>
                    </div>
                </Form>
                {error && <Alert variant="danger" style={{margin: 5 + 'px'}}>{error}</Alert>}
            </Container>

            <Container className="text-center mt-4 text-primary">
                <p>Don't Have An Account? <Link href="/register">Register</Link></p>
            </Container>

            <Container className="text-center mt-3 text-danger">
            
            </Container>
            
        </Container>
    )
}

export default LogInForm;
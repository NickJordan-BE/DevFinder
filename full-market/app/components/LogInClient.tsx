'use client';
import {useState} from 'react'
import { Button, Container, Form, Alert } from "react-bootstrap";
import Authorization from "../api/Authorization"
import { useRouter } from 'next/navigation';

export default function LogInClient() {
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
            });
            
            if (response.status === 201) {
                setPassword("");
                router.push('/');
            }

          } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "User Login Failed");
          }
    }

    
    return (
        <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control name="identifier" onChange={e => setIdentifier(e.target.value)} type="text" placeholder="Enter Username or Email" required></Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="formPassword" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" required></Form.Control>
            </Form.Group>
                
            <div className="text-center mt-4">
                <Button variant="primary" type="submit">Sign In</Button>
            </div>
        </Form>
        {error && <Alert variant="danger" style={{margin: 5 + 'px'}}>{error}</Alert>}
        </Container>
    )
}
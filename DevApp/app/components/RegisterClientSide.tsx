'use client';
import { useState } from 'react'
import { Button, Container, Form, Alert } from "react-bootstrap";
import Authorization from "../api/Authorization"
import { useRouter } from 'next/navigation';


const RegisterFormClient = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await Authorization.post("/reg", {
                username,
                email,
                password
            });
            
            if (response.status === 201) {
                setEmail("");
                setUsername("");
                setPassword("");
                setMessage(`User: ${response.data.username}, Registered Successfully! Please Verify Email to Continue`);
                setError("");
            }

            } catch (err: any) {
            console.error(err);
            setMessage("");
            setError(err.response?.data?.message || "User Registration Failed");
            }
    }



    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" onChange={e => setEmail(e.target.value)} type="text" placeholder="Enter Email" required></Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter Username" required></Form.Control>
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" required></Form.Control>
            </Form.Group>
            
            <div className="text-center mt-4">
                <Button variant="primary" type="submit">Register</Button>
            </div>
        </Form>

        {message && <Alert variant="success" style={{margin: 5 + "px"}}>{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
    </Container>
    )
}

export default RegisterFormClient;
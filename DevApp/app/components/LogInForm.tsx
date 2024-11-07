import React from "react";
//import Authorization from "../api/Authorization";
import { Button, Container, Form } from "react-bootstrap";
import LogInClient from "./LogInClient";
import Link from "next/link";



const LogInForm = () => {

    return (
        <Container className="mt-5 w-50">
            <h1 className="text-center display-3">Sign In</h1>
                <LogInClient />
            <Container className="text-center mt-3 text-primary">
                <p>Don't Have An Account? <Link href="/register">Register</Link></p>
            </Container>

            <Container className="text-center mt-3 text-danger">
            
            </Container>
            
        </Container>
    )
}

export default LogInForm;
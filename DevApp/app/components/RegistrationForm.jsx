import React from "react"
import { Container } from "react-bootstrap";
import RegistrationClientForm from '../components/RegisterClientSide'
import Link from "next/link";

const RegistrationForm = () => {

    return (
        <Container className="mt-5 w-50">
            <h1 className="text-center display-3">Register</h1>
            
            <RegistrationClientForm />

            <Container className="text-center mt-3 text-primary">
                <p>Already Have An Account? <Link href="/login">Sign In</Link></p>
            </Container>

            <Container className="text-center mt-3 text-danger">
                {/* {message && <p>{message}</p>} */}
            </Container>

            
        </Container>
    )
}

export default RegistrationForm;
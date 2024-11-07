import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "react-bootstrap";
import codeBack from '../../public/codingback.png'

const Home = () => {

    return (
        <div className="p-0"> 
            <div className="position-relative">
            <Image
                src={codeBack}
                alt="Descriptive text for screen readers"
                width={500}
                height={500}
                layout="responsive"
                className="opacity-100"
              />
              <div className="border-dark shadow position-absolute top-50 start-50 
                              translate-middle bg-dark bg-gradient text-white text-center fw-bold p-3
                              rounded">
                <h1 className="mb-3">
                    Find the Perfect Team For Your Dream Project
                </h1>
                <h5>
                    Join other developers with similar interests to build your personal portfolio!
                    From small to full-stack applications, find the best team for your project needs and
                    develop team skills in a company like environment.
                </h5>
                <Button variant="primary" size="lg" className="mt-3">
                    <Link className="text-white text-decoration-none" href={"/register"}>Sign Up</Link>
                </Button>
            </div>
                
            </div>
            <div className="bg-dark bg-gradient text-white text-center">
                <h1 className="p-3">
                    Browse Popular Posts Looking for Developers "insert slider of posts"
                </h1>
            </div>
            <div className="bg-dark bg-gradient text-white text-center pg-2">
                <h3 className="mb-4">
                    Connect With Others Now! Find Developers That Want to Build The Same Projects!
                </h3>
                <Button variant="primary" size="lg">Connect Now</Button>
            </div>
        </div>
    )
}

export default Home
'use client'
import React from "react";
import { useEffect, useState } from "react";
import Authorization from "../../api/Authorization";
import { useParams } from "next/navigation";



const EmailConfirmPage = () => {
    const [message, setMessage] = useState("Loading...");
    const params = useParams();

    const token : string | string[] | undefined = params.token;

    useEffect(() => {
  
        if (token) {
            const verifyEmail = async () => {
                try {
                    await Authorization.get(`/verify/${token}`);
                }
                catch (err) {
                    console.error(err)
                }
            }
            verifyEmail()
        }
    })

    return (
        <div>
            {message && <p>{message}</p>}
        </div>
    )
}

export default EmailConfirmPage;
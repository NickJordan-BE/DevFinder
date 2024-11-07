import type { AppProps } from "next/app"
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
// import { createContext } from "vm";
// import { useContext } from "react";

export default function App({ Component, pageProps }: AppProps) {

    
    return (
        <Component {...pageProps} />
    )
}
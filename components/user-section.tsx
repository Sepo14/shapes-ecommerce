"use client"

import { useState } from "react"
import RegisterForm from "./register"
import LogInForm from "./login-form"

export default function UserSection() {

    const [showForm, setShowForm] = useState(true)

    return (
        <div className="flex flex-col items-center p-15 bg-(--enfasis)/40 w-full" id="login">
            {showForm ? <LogInForm /> : <RegisterForm />}
            {showForm ? <p className="text-lg mt-5">
                Are you new here? <a className="cursor-pointer font-bold text-(--enfasis) underline" onClick={()=>{setShowForm(!showForm)}}>Create an account</a>
            </p> : <a className="cursor-pointer mt-5 text-lg font-bold text-(--enfasis) underline" onClick={()=>{setShowForm(!showForm)}}>Log In</a> }
            
        </div>
    )
}
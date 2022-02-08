import React, { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth, provider } from "../config/firebase";

const Login = () => {

    const [output, setoutput] = useState({})

    const Auth = () => {


        signInWithPopup(auth, provider).then((result) => {
            const credentials = GoogleAuthProvider.credentialFromResult(result)
            const token = credentials.accessToken;
            setoutput(result.user)

        }).catch((error) => {

            setoutput(`Sorry can't login please try again : ${error.message}`)
        })

    }



    return (
        <div className="login-container-backdrop">
            <div className='login-container' >
                <h1 className='login-container-heading' >Sign in to tasker</h1>
                <button className='login-container-btn' onClick={Auth}>Sign In</button>
            </div>
        </div>
    )
}

export default Login

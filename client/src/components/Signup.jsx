import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';


import { EditorState } from '../context/ContextProvider';
import { signupApi } from "../Api/userApi";


const Signup = () => {
    const { user, setUser } = EditorState();
    const [signup, setSignup] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    });
    const [error, setError] = useState({
        status: false,
        type: "",
    })

    const handleChange = (e) => {
        if (e.target.name == "password") {
            let inputValue = e.target.value;
            const regex = /((?=.*[a-z])(?=.*[A-Z]{1,})(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])){8,40}/
            if (inputValue.length < 8 || inputValue.length > 40 || !regex.test(inputValue)) {
                setError({
                    status: true,
                    type: "password",
                });
                return;
            }
            else {
                setError({
                    status: false,
                    type: "",
                })
            }
        }

        setSignup((prev) => ({
            ...prev, [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (signup.password !== signup.cpassword) {
            alert("password not matching");
            return;
        }

        const response = await signupApi(signup.username, signup.email, signup.password)
        setUser(response);
    }

    return (
        <>
            {user && <Navigate to={'/'} replace></Navigate>}
            <div className="form-wrapper">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <span style={{ fontSize: "30px", }}>Sign up</span>
                    <div className="input-item">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" autoComplete="off" onChange={(e) => { handleChange(e) }} required />
                    </div>
                    <div className="input-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" autoComplete="off" onChange={(e) => { handleChange(e) }} required />
                    </div>
                    <div className="input-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" autoComplete="off" onChange={(e) => { handleChange(e) }} required />
                        {
                            error.status === true && error.type === "password" &&
                            <span style={{ color: "red"}}>
                                Password should be atleast 8 characters and there must be a capital letter, atleast 1 special character and 1 number.
                            </span>
                        }
                    </div>
                    <div className="input-item">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" id="cpassword" name="cpassword" autoComplete="off" onChange={(e) => { handleChange(e) }} required />
                    </div>

                    <button className="login-btn btn">
                        Signup
                    </button>

                    <div>
                        <p>Already registerd user | <Link to={"/login"}>Login</Link></p>
                    </div>
                </form>

            </div>
        </>
    )
}


export default Signup;
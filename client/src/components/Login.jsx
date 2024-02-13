import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
// import { v4 as uuid } from "uuid";



import {EditorState} from '../context/ContextProvider';
import { loginApi } from "../Api/userApi";

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const {user, setUser} = EditorState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogin((prev) => ({
            ...prev, [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await loginApi(login.email ,login.password);
        localStorage.setItem("userdata", JSON.stringify(response));
        localStorage.setItem("loginTime", new Date(Date.now()).getTime());
        setUser({ username: response.username, email: response.email});
    }

    return (
        <>
            {user && <Navigate to={`/`}  replace></Navigate>}
            <div className="form-wrapper">
                <form className="form" onSubmit={(e) => {handleSubmit(e)}}>
                    <span style={{ fontSize: "30px" }}>Login</span>
                    <div className="input-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" autoComplete="off" onChange={(e) => {handleChange(e)}} required />
                    </div>
                    <div className="input-item">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" autoComplete="off" onChange={(e) => {handleChange(e)}} required />
                    </div>

                    <button className="login-btn btn">
                        Login
                    </button>

                    <div>
                        <p>Create new account | <Link to={"/signup"}>Sign up</Link></p>
                    </div>
                </form>

            </div>
        </>
    )
}


export default Login;
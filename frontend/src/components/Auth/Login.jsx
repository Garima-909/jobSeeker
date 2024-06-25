import React, {useState, useContext} from "react";
import {Context} from "../../main.jsx";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {MdOutlineMailOutline} from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import {Navigate, Link} from "react-router-dom";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const {isAuthorised, setIsAuthorised, user, setUser} = useContext(Context);

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post(
                "http://localhost:4000/api/v1/user/login", 
                {email, password, role}, 
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            toast.success(data.message);
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorised(true);
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    if(isAuthorised){
        return <Navigate to={"/"}/>
    }

    return (
        <>
            <div className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="JobZeelogo.png" alt="logo" />
                        <h3>Login to your account</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Login As : </label>
                            <div>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>

                                <option value="">Select Role</option>
                                <option value="Employer">Employer</option>
                                <option value="Job seeker">Job Seeker</option>
                            </select>
                            <FaRegUser/>
                            </div>
                        </div>
                        
                        <div className="inputTag">
                            <label>Email : </label>
                            <div>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <MdOutlineMailOutline/>
                            </div>
                        </div>
                        
                        <div className="inputTag">
                            <label>Password : </label>
                            <div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <RiLock2Fill/>
                            </div>
                        </div>

                        <button onClick={handleLogin} type="submit">Login</button>
                        <Link to={"/register"}>Register Now</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="login.png" alt="login" />
                </div>
            </div>
        </>
    )
};

export default Login;
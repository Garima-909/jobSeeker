import React, {useState, useContext} from "react";
import {Context} from "../../main.jsx";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import {MdOutlineMailOutline} from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import {Navigate, Link} from "react-router-dom";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const {isAuthorised, setIsAuthorised, user, setUser} = useContext(Context);

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post(
                "http://localhost:4000/api/v1/user/register", 
                {name, email, password, phone, role}, 
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            toast.success(data.message);
            setEmail("");
            setPassword("");
            setName("");
            setPhone("");
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
                        <h3>Create a new account</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Register As : </label>
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
                            <label>Name : </label>
                            <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            <FaPencilAlt/>
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
                            <label>Phone Number : </label>
                            <div>
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            <FaPhoneFlip/>
                            </div>
                        </div>
                        <div className="inputTag">
                            <label>Password : </label>
                            <div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <RiLock2Fill/>
                            </div>
                        </div>

                        <button onClick={handleRegister} type="submit">Register</button>
                        <Link to={"/login"}>Login Now</Link>
                    </form>
                </div>
                <div className="banner">
                    <img src="register.png" alt="register" />
                </div>
            </div>
        </>
    )
};

export default Register;
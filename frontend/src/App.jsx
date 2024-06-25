import React, {useEffect, useContext} from "react";
import "./App.css";
import {Context} from "./main.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import Jobs from "./components/Job/Jobs.jsx";
import JobDetails from "./components/Job/JobDetails.jsx";
import MyJobs from "./components/Job/MyJobs.jsx";
import PostJob from "./components/Job/PostJob.jsx";
import Application from "./components/Application/Application.jsx";
import MyApplication from "./components/Application/MyApplication.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {

  const {isAuthorised, setIsAuthorised, setUser} = useContext(Context);

  useEffect(() => {

    const fetchUser = async() => {
      try{
        const response =await axios.get("http://localhost:4000/api/v1/user/getUser", {withCredentials: true});
        setUser(response.data.user);
        setIsAuthorised(true);
      }
      catch(err){
        setIsAuthorised(false);
      };
    }
    

    fetchUser();
  }, [isAuthorised]);






  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/job/getAll" element={<Jobs/>}/>
          <Route path="/job/:id" element={<JobDetails/>}/>
          <Route path="/job/post" element={<PostJob/>}/>
          <Route path="/job/me" element={<MyJobs/>}/>
          <Route path="/application/:id" element={<Application/>}/>
          <Route path="/application/me" element={<MyApplication/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>

        <Footer/>
        <Toaster/>
      </Router>
    </div>
  )
}

export default App;
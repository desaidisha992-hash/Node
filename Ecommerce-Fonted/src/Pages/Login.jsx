import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext, { DataContext } from "../Context/UserContext";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const {setCenterData}= useContext(DataContext);
  const navigate = useNavigate();

  //api fetch -- data send
  const submitForm = async () =>{
    console.log(" Form Submitted !!");

    const userdata = {email: email, password: password}
    try {
      let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userdata);

      if(response.status === 200){
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCenterData(data.checkUser);
        navigate("/profile");
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      let error = e.response?.data?.error;
      setError(error);
    }

    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-indigo-200">
      
      <div className="backdrop-blur-lg bg-white/70 shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/40">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" onSubmit={(e)=>e.preventDefault(submitForm())}>
           {error && <div>
            {error.map((val, index)=>{
              return <p key={index} className="bg-red-100 rounded-xl p-2 w-full text-red-600 font-normal mb-2 text-center">{val.msg}</p>
            })}
          </div>}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember
            </label>

            <span className="text-blue-500 cursor-pointer hover:underline">
              Forgot?
            </span>
          </div>

          <button className="w-full bg-linear-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl hover:opacity-90">
            LogIn
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer"><Link to="/JoinUs">Join Us</Link></span>
        </p>
      </div>
    </div>
  );
};

export default Login;
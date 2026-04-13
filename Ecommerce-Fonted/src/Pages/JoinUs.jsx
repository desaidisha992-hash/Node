import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JoinUs = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userdata = {username: username, email: email, password: password}

    const submitForm = async()=>{
        console.log("Form Submitted !!!");
        console.log(userdata);

        let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userdata);

        if(response.status === 200){
            const data = response.data;

            localStorage.setItem("token", data.token);
        }

        setUsername("")
        setEmail("")
        setPassword("")
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-blue-200">
      
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/40">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h2>

        <form className="space-y-4" onSubmit={(e) =>{
            e.preventDefault(submitForm())
        }}>
          
          <input
            type="text"
            name="username"
            value= {username}
            onChange={(e)=>{
                setUsername(e.target.value);
            }}
            placeholder="User Name"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="email"
            name= "email"
            value= {email}
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            name= "password"
            value= {password}
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 accent-indigo-500" />
            <p>
              I agree to{" "}
              <span className="text-indigo-500 cursor-pointer">
                Terms & Conditions
              </span>
            </p>
          </div>

          <button className="w-full bg-linear-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-xl hover:opacity-90">
            Join Now
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-indigo-500 cursor-pointer"><Link to="/login">Login</Link></span>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
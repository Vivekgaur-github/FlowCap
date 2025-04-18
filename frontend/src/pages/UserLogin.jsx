import React, { useState, useContext } from "react";
import FlowCapLogo from "../assets/FlowCap_Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState(""); // Remove the space
  const [password, setPassword] = useState(""); // Initialize with empty string
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submithandler = async(e) => {
    e.preventDefault();
    try {
      const userData = {
        email: email.trim(), // Trim whitespace
        password,
      };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      if(response.status === 200){
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="p-7 h-screen flex justify-between flex-col w-full ">
      <div>
        <img className="w-25  mb-10 " src={FlowCapLogo} alt="FlowCap Logo" />
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@expample.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 py-2 px-4 rounded border w-full text-lg placeholder:text-base"
            type="password"
            name="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white cursor-pointer font-semibold mb-3 py-2 px-4 rounded   w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className=" text-center">
            New here?
            <Link to={"/signup"} className="text-blue-600">
              {" "}
              Create an account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to={"/Captain-login"}
          className="bg-[#10b461] flex flex-items-center justify-center text-white font-semibold mb-5 py-2 px-4 rounded  w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FlowCapLogo from "../assets/FlowCap_Logo.png";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import "remixicon/fonts/remixicon.css";


const CaptainLogin = () => {
  const [email, setEmail] = useState(""); // Remove the space
  const [password, setPassword] = useState(""); // Initialize with empty string
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = {
        email: email.trim(), // Trim whitespace
        password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="p-7 h-screen flex justify-between flex-col w-full ">
      <div>
        <img className="w-25  mb-10 " src={FlowCapLogo} alt="FlowCap Logo" />
       <h5 className="absolute top-9 left-32 "><i className="ri-steering-2-fill ri-lg"></i></h5>

        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">
            What's our captain's email
          </h3>
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
          <button className="bg-[#111] text-white cursor-pointer font-semibold mb-3 py-2 px-4 rounded  w-full text-lg placeholder:text-base">
            Login
          </button>
          <p className=" text-center">
            New here?
            <Link to={"/Captain-signup"} className="text-blue-600">
              {" "}
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to={"/login"}
          className="bg-[#d5622d] flex flex-items-center justify-center text-white font-semibold mb-5 py-2 px-4 rounded  w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;

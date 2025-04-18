import React from "react";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlowCapLogo from "../assets/FlowCap_Logo.png";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserDataContext);

  const submithandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      console.error("Registration error:", err);
    }
  };

  
  return (
    <div className="p-7 h-screen flex justify-between flex-col w-full ">
      <div>
        <img className="w-25 mb-10" src={FlowCapLogo} alt="FlowCap Logo" />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex  gap-4 mb-6">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              name="firstName"
              className="bg-[#eeeeee] w-1/2  py-2 px-4 rounded border  text-lg placeholder:text-s"
              type="text"
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              name="lastName"
              className="bg-[#eeeeee] w-1/2  py-2 px-4 rounded border  text-lg placeholder:text-sm"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            className="bg-[#eeeeee] mb-6 py-2 px-4 rounded border w-full text-lg placeholder:text-sm"
            type="email"
            placeholder="email@expample.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 py-2 px-4 rounded border w-full text-lg placeholder:text-sm"
            type="password"
            name="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 py-2 px-4 rounded cursor-pointer  w-full text-lg placeholder:text-sm">
           Create account
          </button>
          <p className=" text-center">
            Already have a account?
            <Link to={"/login"} className="text-blue-600">
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tiny text-center">
         This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy </span> and <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;

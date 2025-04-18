import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FlowCapLogo from "../assets/FlowCap_Logo.png";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "remixicon/fonts/remixicon.css";




const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { setCaptain } = React.useContext(CaptainDataContext);

  const submithandler = async (e) => {
    e.preventDefault();
    const captainData={
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData);

    if (response.status === 201) {
      const data=response.data;
      setCaptain(data.captain);
      localStorage.setItem("token",data.token);
      navigate("/captain-home");
    }



    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");

  };

  return (
    <div className="px-5 py-5 h-screen flex justify-between flex-col w-full ">
      <div>
        <img className="w-25  mb-10 " src={FlowCapLogo} alt="FlowCap Logo" />
        <h5 className="absolute top-7 left-30 "><i className="ri-steering-2-fill ri-lg"></i></h5>
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex  gap-4 mb-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              name="firstName"
              className="bg-[#eeeeee] w-1/2  py-2 px-4 rounded border  text-lg placeholder:text-sm"
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
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email
          </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            className="bg-[#eeeeee] mb-4 py-2 px-2 rounded border w-full text-lg placeholder:text-sm"
            type="email"
            placeholder="email@expample.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-4 py-2 px-2 rounded border w-full text-lg placeholder:text-sm"
            type="password"
            name="password"
            required
            placeholder="password"
          />
          <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-4 mb-4">
            {" "}
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee] mb-2 py-2 px-2 rounded border w-full text-lg placeholder:text-base"
              type="text"
              name="vehicleColor"
              required
              placeholder="Vehicle Color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#eeeeee] mb-2 py-2 px-2 rounded border w-full text-lg placeholder:text-sm"
              type="text"
              name="vehiclePlate"
              required
              placeholder="Vehicle Plate Number"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee] mb-2 py-2 px-2 rounded border w-full text-lg placeholder:text-base"
              type="number"
              name="vehicleCapacity"
              required
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] mb-2 py-2 px-2 rounded border w-full text-lg placeholder:text-base"
              required
              name="vehicleType"
            >
              <option value="">Select Vehicle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>

          <button className="bg-[#111] text-white cursor-pointer font-semibold mb-15 py-2 px-4 rounded  w-full text-lg placeholder:text-sm">
            Create captain account
          </button>
          <p className=" text-center">
            Already have a account?
            <Link to={"/Captain-login"} className="text-blue-600 ">
              {" "}
              login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tiny text-center mb-2">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy </span> and{" "}
          <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;





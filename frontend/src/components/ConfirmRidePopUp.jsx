import React from "react";
import driver_avatar from "../assets/driver.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // console.log("ConfirmRidePopUp Props:", props);
  // console.log("Type of setConfirmRidePopUpPanel:", typeof props.setConfirmRidePopUpPanel);

  const submitHandler = async (e) => {
    e.preventDefault()

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
            rideId: props.ride._id,
            otp: otp
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false)
        props.setRidePopUpPanel(false)
        navigate('/captain-riding', { state: { ride: props.ride } })
    }


}

  return (
    <div>
      <h5
        onClick={() => props.setRidePopUpPanel(false)}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-lg font-semibold mb-5">Confirm this ride to start</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-xl mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={driver_avatar}
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname || 'captain'}
          </h2>
           
          
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 items-center justify-between flex-col ">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">526/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">526/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>
        <div className=" mt-6 w-full ">
          <form
            onSubmit={submitHandler}
          >
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="bg-[#eee] p-3 text-lg font-mono rounded-lg w-full mt-3 text-center"
            />
            <button
             
              onClick={() => {}}
              className=" mt-2 w-full flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="w-full mt-2  bg-red-500 text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;

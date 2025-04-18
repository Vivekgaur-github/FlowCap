import React from "react";
import car from "../assets/car.webp";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.waitingForDriver(false)}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <div className="flex  items-center justify-between ">
        <img className="h-19" src={car} alt="" />
        <div className="text-right">
          <h3 className="text-lg font-normal -mb-1 capitalize">
            {props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname || 'captain'}
          </h3>
          <h4 className="text-xl font-semibold  -mt-1 ">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-base text-gray-600">Verna</p>
          <h1 className="text-lg font-semibold"> {props.ride?.otp} </h1>
        </div>
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
      </div>
    </div>
  );
};

export default WaitingForDriver;

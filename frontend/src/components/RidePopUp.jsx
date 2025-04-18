import React,{useContext} from "react";
import car from "../assets/car.webp";
import driver_avatar from '../assets/driver.jpg'
const RidePopUp = (props) => {
 

  return (
    <div>
      <h5
        onClick={() => props.setRidePopUpPanel(false)}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-lg font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-xl mt-4">
        <div className="flex items-center gap-3 ">
            <img className="h-12 w-12 rounded-full object-cover" src={driver_avatar} alt="" />
            <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
               { props.ride?.pickup}
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
              <p className="text-sm text-gray-600 -mt-1">
                Cash
              </p>
            </div>
          </div>
        </div>
        <div className="flex mt-5 w-full justify-between items-center">
        <button
         onClick={() => {
           props.setRidePopUpPanel(false)
    
         }}
         className="  bg-gray-600 text-white font-semibold p-3 px-10 rounded-lg"
       >
         Ignore
       </button>
        <button
         
         onClick={() => {
           props.setConfirmRidePopUpPanel(true)
           props.confirmRide()
         }}
         className="  bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
       >
         Accept
       </button>
       
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;

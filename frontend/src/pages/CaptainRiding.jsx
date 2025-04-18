import React, { useRef, useState } from "react";
import FlowCap from "../assets/FlowCap_Logo.png";
import { Link,useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import FinishRide from "../components/FinishRide";


const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride


    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, { transform: "translateY(0)" });
          } else {
            gsap.to(finishRidePanelRef.current, { transform: "translateY(100%)" });
          }
        },
        [finishRidePanel, finishRidePanelRef]
      );
    
  return (
    <div className="h-screen ">
      <div className="fixed p-6 top-0 flex items-center justify-between  w-screen">
        <img className="w-25" src={FlowCap} alt="" />
        <Link
          to="/captain-home"
          className=" flex items-center justify-center rounded-full h-10 w-10 bg-white"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        
      </div>
      {/* // temporary image */}
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative" 
      onClick={()=>{
        setFinishRidePanel(true)
      }}>

        <h5 className="p-1 text-center w-[95%] absolute top-0 ">
          <i className="text-3xl text-gray-600 ri-arrow-up-wide-line "></i>
        </h5>
   
        <h4 className="font-semibold text-xl">{`4 KM away`}</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <FinishRide
          ride={rideData}
          finishRidePanel={finishRidePanel}
        setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;

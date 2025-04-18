import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import FlowCap from "../assets/FlowCap_Logo.png";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = (props) => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const ridePopUpPanelRef = useRef(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    // const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval)
  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopUpPanel(true);
  });

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );


    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, { transform: "translateY(0)" });
      } else {
        gsap.to(ridePopUpPanelRef.current, { transform: "translateY(100%)" });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  // console.log("Rendering CaptainHome - confirmRidePopUpPanel:", confirmRidePopUpPanel);

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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 h-screen translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
           ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
         
        />
      </div>
    </div>
  );
};

export default CaptainHome;

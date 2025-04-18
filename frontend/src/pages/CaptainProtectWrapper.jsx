import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCaptain(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("User fetch error:", err);
        setError(err.message);
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };

    fetchProfile();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading captain profile...</p>
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>
      </div>
    );
  }

  return token ? <>{children}</> : null;
};

export default CaptainProtectWrapper;

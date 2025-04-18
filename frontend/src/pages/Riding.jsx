import React from "react";
import { SocketContext } from '../context/SocketContext'
import car from '../assets/car.webp'
import { Link,useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";




const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()
  socket.on("ride-ended", () => {
    navigate('/home')
})


  return (
      <div className="h-screen ">
        <Link to='/home' className="fixed right-2 top-2 flex items-center justify-center rounded-full h-10 w-10 bg-white">
        <i className="ri-home-4-line"></i>
        </Link>
        {/* // temporary image */}
        <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center"
          alt=""
        />
        </div>
        <div className="h-1/2 p-4">
                <div className="flex  items-center justify-between ">
                    <img className='h-19' src={car} alt="" />
                    <div className='text-right'>
                        <h3 className='text-lg font-normal -mb-1'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname || 'captain'}</h3>
                        <h4 className='text-xl font-semibold  -mt-1 '>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-base text-gray-600'>Verna</p>
                    </div>
                 </div>
                  <div className="flex gap-2 items-center justify-between flex-col ">
                    
                    <div className="w-full mt-5">
                      <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                          <h3 className="text-lg font-medium">526/11-A</h3>
                          <p className="text-sm text-gray-600 -mt-1">
                          {ride?.destination}
                          </p>
                        </div>
                      </div>
                     
                      <div className="flex items-center gap-5 p-3 ">
                        <i className="ri-currency-line"></i>
                        <div>
                          <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
                          <p className="text-sm text-gray-600 -mt-1">
                            cash
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
            <button  className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
                Make a Payment
            </button>
        </div>
       
      </div>
   
  );
};

export default Riding;

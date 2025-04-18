import React, { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
import driver_avatar from '../assets/driver.jpg'

const CaptainDetails = () => {
  const { captain }=useContext(CaptainDataContext)

  return (
    <div> <div className="flex items-center justify-between">
    <div className="flex items-center justify-start gap-3">
      <img className="h-10 w-10 rounded-full object-cover" src={driver_avatar} alt="" />
      <h4 className="text-lg font-medium">{captain.fullname.firstname + " " + captain.fullname.lastname || 'captain'} </h4>
    </div>
    <div>
      <h4 className="text-xl font-semibold">$295.2</h4>
      <p className="text-sm text-gray-600">Earned</p>
    </div>
  </div>
  <div className="flex p-3 rounded-xl bg-gray-100 items-start justify-center gap-7 mt-6">
    <div className="text-center">
      <i className="text-3xl font-thin   ri-time-line"></i>
      <h5  className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-600">Hours Online</p>
    </div>
    <div className="text-center">
      <i className="text-3xl font-thin  ri-speed-up-line"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-600">Hours Online</p>
    </div>
    <div className="text-center">
      <i className="text-3xl font-thin  ri-booklet-line"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-600">Hours Online</p>
    </div>
  </div></div>
  )
}

export default CaptainDetails
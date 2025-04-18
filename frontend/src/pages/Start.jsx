import { Link } from 'react-router-dom';
import FlowCapLogo from '../assets/FlowCap_Logo.png';
import hero_image from '../assets/hero_image.jpg';

const Start = () => {
  return (
    <div 
      className="h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${hero_image})`,backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",   }} 
    >
      <img className="w-25
       ml-8 w-20 filter invert " src={FlowCapLogo} alt="FlowCap Logo" />
      <div className="bg-white pb-7 py-4 px-4">
        <h2 className="text-2xl font-bold">Get Started with FlowCap</h2>
        <Link to={'/login'} className="flex item-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
      </div>
    </div>
  );
};

export default Start;

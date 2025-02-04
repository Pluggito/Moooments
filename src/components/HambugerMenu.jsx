import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const HambugerMenu = ({setIsMenu, isMenu}) => {
    const [active, setActive] = useState(false);
    const location = useLocation();

    const handleRequest = () => {
      setActive((pv) => !pv);
      setIsMenu((pv) => !pv);
    }

    useEffect(()=>{
        if(isMenu){
          setActive(true);
        }else{
          setActive(false)
        }
    },[isMenu]);

  return (
    <div className={`grid float-right sm:hidden z-50 ${
      location.pathname !== '/' ? "absolute top-3 right-1 " : ""
    }`}>
      <AnimatedHamburgerButton 
        active={active}
        handleRequest={handleRequest}
      />

      {/*----Side Menu components---- */}
      <div className={`fixed top-0 right-0 h-[d40vh] transition-all duration-500 ease-out overflow-hidden shadow-lg rounded-bl-xl ${
        isMenu 
          ? "w-[40vw] opacity-100 pointer-events-auto bg-white z-50" 
          : "w-0 opacity-0 pointer-events-auto"
      }`}>
        <div className="flex flex-col my-6 text-center z-10">
          <NavLink onClick={()=> setIsMenu(false)} to='/' className='py-1.5 pl-4 text-base hover:bg-gray-100'>Home</NavLink>
          <NavLink onClick={()=> setIsMenu(false)} to='/about' className='py-1.5 pl-4 text-base hover:bg-gray-100'>About</NavLink>
          <NavLink onClick={()=> setIsMenu(false)} to='/pricing' className='py-1.5 pl-4 text-base hover:bg-gray-100'>Pricing</NavLink>
          <NavLink onClick={()=> setIsMenu(false)} to='/blog' className='py-1.5 pl-4 text-base hover:bg-gray-100'>Blog</NavLink>
          <NavLink onClick={()=> setIsMenu(false)} to='/signup' className='py-1.5 pl-4 text-base hover:bg-gray-100'>Signup</NavLink>
        </div>
      </div>
    </div>
  );
}

// Add PropTypes
HambugerMenu.propTypes = {
  setIsMenu: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired
};

const AnimatedHamburgerButton = ({ active, handleRequest }) => {
    return (
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.button
          initial={false}
          animate={active ? "open" : "closed"}
          onClick={handleRequest}
          className="relative h-10 w-10 rounded-full bg-transparent transition-colors hover:bg-gray-100 z-[100]"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-0.5 w-5 bg-black"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-0.5 w-5 bg-black"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-0.5 w-5 bg-black"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "50%",
            }}
          />
        </motion.button>
      </MotionConfig>
    );
};

// Add PropTypes
AnimatedHamburgerButton.propTypes = {
  active: PropTypes.bool.isRequired,
  handleRequest: PropTypes.func.isRequired
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "50%",
    },
  },
};

export default HambugerMenu;

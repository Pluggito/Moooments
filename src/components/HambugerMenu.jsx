import  { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const HambugerMenu = ({setIsMenu, isMenu}) => {
    const [active, setActive] = useState(false);

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
    <div className={`grid float-right  place-content-center sm:hidden z-50 ${location.pathname !== '/' ? "absolute top-0 right-0" :"" }`}>
    <AnimatedHamburgerButton active={active}
      handleRequest={handleRequest}/>

      {/*----Side Menu components---- */}
      <div className={`fixed top-0 right-0 h-1/2 transition-all duration-500 ease-out overflow-hidden shadow-xl rounded-xl  ${isMenu ? "w-1/2 opacity-100 pointer-events-auto bg-white z-50 " : "w-0 opacity-0 pointer-events-auto "}`}>

        {/*<div className="mx-auto text-center my-2 overflow-x-hidden">
        <NavLink to='/'>
        <p className="text-2xl tracking-wide font-extrabold ">Moooments</p>
      </NavLink>
        </div>*/}

        <div className="flex flex-col my-10 text-center z-10 py-6" >
        <NavLink onClick={()=> setIsMenu(false)} to='/' className='py-2 pl-6 text-lg'>Home</NavLink>
        <NavLink onClick={()=> setIsMenu(false)} to='/about' className='py-2 pl-6 text-lg '>About</NavLink>
        <NavLink onClick={()=> setIsMenu(false)} to='/pricing' className='py-2 pl-6 text-lg '>Pricing</NavLink>
        <NavLink onClick={()=> setIsMenu(false)} to='/blog' className='py-2 pl-6 text-lg '>Blog</NavLink>
        <NavLink onClick={()=> setIsMenu(false)} to='/signup' className='py-2 pl-6 text-lg'>Signup</NavLink>
        </div>
      

      </div>
  </div>
  );
}

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
    className="relative h-12 w-12 rounded-full bg-transparent transition-colors hover:bg-gray-200 z-[100]"
  >
  
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-1 w-8 bg-black"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-1 w-8 bg-black"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-1 w-5 bg-black"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "calc(50% + 5px)",
            }}
          />
        </motion.button>
      </MotionConfig>
    );
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
        left: "calc(50% + 5px)",
      },
    },
  };

export default HambugerMenu

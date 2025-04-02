import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const HambugerMenu = ({setIsMenu, isMenu, isLoggedIn}) => {
    const [active, setActive] = useState(false);

    const handleRequest = () => {
      setActive((pv) => !pv);
      setIsMenu((pv) => !pv);
    }

    useEffect(() => {
      if(isMenu) {
        setActive(true);
        document.body.style.overflow = 'hidden';
      } else {
        setActive(false);
        document.body.style.overflow = 'unset';
      }
    }, [isMenu]);

    return (
      <div className="grid float-right sm:hidden pointer-events-auto">
        <span className="sr-only">Toggle menu</span>
        <AnimatedHamburgerButton 
          active={active}
          handleRequest={handleRequest}
        />

        <motion.div
          initial={false}
          animate={isMenu ? "open" : "closed"}
          variants={{
            open: { 
              x: "0%",
              transition: { type: "spring", stiffness: 300, damping: 30 }
            },
            closed: { 
              x: "100%",
              transition: { type: "spring", stiffness: 300, damping: 30 }
            }
          }}
          className="fixed inset-0 bg-white z-[40]"
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <motion.div
              variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: 20, opacity: 0 }
              }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-6 text-center"
            >
              <NavLink 
                onClick={() => setIsMenu(false)} 
                to='/' 
                className='text-3xl font-medium hover:text-[#c300f9] transition-colors'
              >
                Home
              </NavLink>
              <NavLink 
                onClick={() => setIsMenu(false)} 
                to='/about' 
                className='text-3xl font-medium hover:text-[#c300f9] transition-colors'
              >
                About
              </NavLink>
              <NavLink 
                onClick={() => setIsMenu(false)} 
                to='/pricing' 
                className='text-3xl font-medium hover:text-[#c300f9] transition-colors'
              >
                Pricing
              </NavLink>
              <NavLink 
                onClick={() => setIsMenu(false)} 
                to='/blog' 
                className='text-3xl font-medium hover:text-[#c300f9] transition-colors'
              >
                Blog
              </NavLink>
               <NavLink 
                onClick={() => setIsMenu(false)} 
                to='/signup' 
                className={`${isLoggedIn ? 'hidden' : 'text-3xl font-medium hover:text-[#c300f9] transition-colors' }`}
              >
                Sign Up
              </NavLink>
              
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
};

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
        role='button'
      >
        <motion.button
        type="button"
          initial={false}
          animate={active ? "open" : "closed"}
          onClick={handleRequest}
          className="relative h-12 w-12 rounded-full bg-transparent transition-colors hover:bg-gray-100  z-[999] p-2"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-[3px] w-[24px] bg-black rounded"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-[3px] w-[24px]  bg-black rounded"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-[3px] w-[24px] bg-black rounded"
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
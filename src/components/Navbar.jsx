import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HambugerMenu from "./HambugerMenu";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { UserCircle } from "lucide-react";
import PageLoader from "./PageLoader";

const Navbar = ({ isMenu, setIsMenu , loading, setLoading}) => {
    const components = [
      { label: "About", path: "/about" },
      { label: "Pricing", path: "/pricing" },
      { label: "Blog", path: "/blog" },
    ];
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef();

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };
    
    const handleNavigation = () =>{
      setLoading(true)
      setTimeout(()=>{
        navigate('/dashboard')
        setLoading(false)
      },1000)
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { isLoggedIn, logoutUser } = useContext(AuthContext);
    const [isScreen, setIsScreen] = useState(window.innerWidth > 640);
    const location = useLocation();

    useEffect(() => {
      const handleResize = () => setIsScreen(window.innerWidth > 640);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <nav className="flex sm:flex justify-between items-center px-2 py-3 shadow-xs sticky z-50">
        <div className="flex justify-between items-center ">
          <Link 
            to='/' 
            className="text-2xl sm:text-3xl font-extrabold tracking-wide transition-all duration-300 hover:drop-shadow-[0_8px_12px_rgba(195,0,249,0.7)] no-underline"
          >
            Moooments
          </Link>

          
        </div>

        {location.pathname !== '/signup' && (
          <>
            {!['/about', '/create-album'].includes(location.pathname) && (
              <ul className="hidden sm:flex gap-9">
                {components.map((item, index) => (
                  <NavLink 
                    key={index}
                    to={item.path}
                    className="font-medium text-gray-600 hover:text-[#c300f9] no-underline"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </ul>
            )}

            {isLoggedIn ? (
              <div className="sm:flex items-center gap-4 hidden">
                {loading && <PageLoader />}
                {isScreen && <button onClick={handleNavigation} className="rounded p-2 font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-colors cursor-pointer shadow-md relative z-[30]">My Dashboard</button>}
                <UserCircle className="w-12 h-12 transition-all duration-300 hover:text-[#c300f9]" strokeWidth={1.3} onClick={toggleDropdown} />
                {dropdownVisible &&  <div className="absolute right-0 top-[100%] mt-2 bg-white border border-gray-200 p-2 shadow-lg z-10 rounded-md">
                  <button
                    onClick={() => {
                      logoutUser();
                      toggleDropdown();
                    }}
                    className="font-medium text-gray-600 hover:text-[#c300f9] transition-colors cursor-pointer w-full text-left"
                  >
                    Log out
                  </button>
                </div>}
              </div>
            ) : (
              <div className="sm:flex items-center gap-4 hidden">
                <NavLink to='/signup'>
                  <button
                    className="border-2 border-black rounded sm:w-[101px] sm:h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300 shadow-md p-2 cursor-pointer"
                  >
                    Login
                  </button>
                </NavLink>
                <NavLink to='/signup'>
                  <motion.button
                    className="rounded sm:w-[101px] sm:h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 shadow-md p-2 cursor-pointer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 0.95 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                  >
                    Sign Up
                  </motion.button>
                </NavLink>
              </div>
            )}
          </>
        )}

{!isScreen && <div className="flex items-center justify-center gap-3">
            {/* Hamburger menu and user icon (for smaller screens) */}
            <User isScreen={isScreen} toggleDropdown={toggleDropdown} dropdownVisible={dropdownVisible} logoutUser={logoutUser} isLoggedIn={isLoggedIn} handleNavigation={handleNavigation} />
            <HambugerMenu isMenu={isMenu} setIsMenu={setIsMenu} isLoggedIn={isLoggedIn} />
            
          </div>}
      </nav>
    );
};

const User = ({ toggleDropdown, dropdownVisible, isLoggedIn, logoutUser, handleNavigation }) => {
    return (
        <>
            <UserCircle className={`${isLoggedIn ? 'w-8 h-8 transition-all duration-300 hover:text-[#c300f9]' : 'hidden'}`} strokeWidth={1.5} onClick={toggleDropdown} />
            {dropdownVisible && (
                <div className="absolute right-0 top-[100%] mt-2 flex-col flex gap-4 bg-white border border-gray-200 p-2 shadow-lg z-10 rounded-md">
                    <button
                        onClick={() => {
                            handleNavigation();
                            toggleDropdown();
                        }}
                        className="font-medium text-gray-600 hover:text-[#c300f9] transition-colors cursor-pointer w-full text-left p-2"
                    >
                        My Dashboard
                    </button>
                    <div className="w-full bg-slate-300 h-1"></div>
                    <button
                        onClick={() => {
                            logoutUser();
                            toggleDropdown();
                        }}
                        className="font-medium text-gray-600 hover:text-[#c300f9] transition-colors cursor-pointer w-full text-left"
                    >
                        Log out
                    </button>
                </div>
            )}
        </>
    );
};

Navbar.propTypes = {
  isMenu: PropTypes.bool.isRequired,
  setIsMenu: PropTypes.func.isRequired,
};

export default Navbar;

import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
    const components = [
      {label: "Home", path: "/"},
      { label: "About", path: "/about" },
      { label: "Pricing", path: "/pricing" },
      { label: "Blog", path: "/blog" },
    ];

    const location = useLocation();
    const Navigate = useNavigate();
    const [isMobile, setIsMobile] = useState();

    {/*useEffect(()=>{

      const handleResize = () =>{
        setIsMobile(window.innerWidth <=640);
          }

          handleResize();
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);

    },[isMobile]) */}
  
    return (
      <nav className={`sm:flex justify-around items-center max-w-6xl mx-auto my-3 inline-block ${location.pathname === '/' ?"absolute top-0 left-0 right-0 z-10" : ""}`}>
        {/* Brand Name */}
        
        <p id="header" className="text-2xl tracking-wide font-extrabold ">Moooments</p>
 
  
        
        {/* Navigation Links */}
        {
          location.pathname !== '/signup' ?  (
            <>
              <ul className="hidden sm:flex flex-row justify-between gap-9">
          {components.map((item, index) => (
            <NavLink 
            key={index}
            to={item.path}>
              <li
              className="font-medium cursor-pointer"
            >
              {item.label}
            </li>
            </NavLink>
            
          ))}
        </ul>
  
        {/* Buttons */}
        <div className=" sm:flex flex-row justify-center items-center gap-4 hidden">
          <NavLink to='/signup'>
          <button
            type="button"
            className="border-2 border-black rounded sm:w-[101px] sm:h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
            cursor-pointer shadow-md p-2 " 
          >
            Login
          </button>
          </NavLink>
          <NavLink to='/signup'>
          <button
            className="rounded sm:w-[101px] sm:h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md p-2"
          >
            Sign Up
          </button>
          </NavLink>
        </div>
            </>
          ) : <button onClick={()=>Navigate('/')} className="border-2
          hidden sm:inline border-black rounded sm:w-[101px] sm:h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
          cursor-pointer shadow-md m">  Go to Home</button>}

          
      
      </nav>
    );
  };
  
  export default Navbar;
  
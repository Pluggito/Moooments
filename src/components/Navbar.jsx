import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../index.css'


const Navbar = () => {
    const components = [
      { label: "About", path: "/about" },
      { label: "Pricing", path: "/pricing" },
      { label: "Blog", path: "/blog" },
    ];

    const location = useLocation();
    const Navigate = useNavigate();
   

  
  
    return (
      <nav className={`sm:flex justify-around items-center max-w-8xl mx-auto my-3 inline-block ${location.pathname === '/' ?"absolute top-0 left-3 right-0 z-10" : ""}`}>
        {/* Brand Name */}
        <Link 
          id="header" 
          to='/' 
          className="text-3xl tracking-wide font-extrabold transition-all duration-300 hover:drop-shadow-[0_8px_12px_rgba(195,0,249,0.7)] hover:scale-105 no-underline text-black"
        >
          Moooments
        </Link>
        
 
  
        
        {/* Navigation Links */}
        {
          location.pathname !== '/signup' ?  (
            <>
              <ul className="hidden sm:flex flex-row justify-between gap-9">
          {components.map((item, index) => (
            <NavLink 
            key={index}
            to={item.path}
            className="font-medium cursor-pointer no-underline text-gray-600 hover:text-[#c300f9]"
            >
              {item.label}
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
          ) : <></>}

          
      
      </nav>
    );
  };
  
  export default Navbar;
  

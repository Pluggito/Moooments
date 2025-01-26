const Navbar = () => {
    const components = [
      { label: "About" },
      { label: "Pricing" },
      { label: "Blog" },
    ];
  
    return (
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-3 absolute top-0 left-0 right-0 z-1">
        {/* Brand Name */}
        <p className="text-2xl tracking-wide font-extrabold ">Moooments</p>
  
        
        {/* Navigation Links */}
        <ul className="hidden sm:flex flex-row justify-between gap-9">
          {components.map((item, index) => (
            <li
              key={index}
              className="font-medium cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
  
        {/* Buttons */}
        <div className=" flex flex-row justify-center items-center gap-4 ">
          <button
            type="button"
            className="border-2 border-black rounded sm:w-[101px] sm:h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
            cursor-pointer shadow-md p-2 "
          >
            Login
          </button>
          <button
            className="rounded sm:w-[101px] sm:h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md p-2"
          >
            Sign Up
          </button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
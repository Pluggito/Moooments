import { motion } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";


const Avatar = ({toggleDropdown, dropdownVisible, isLoggedIn, logoutUser, handleNavigation, dropdownRef, userEmail}) => {

  // Extract the first letter of the email
  const firstLetter = userEmail ? userEmail[0].toUpperCase() : "";

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const backgroundColor = getRandomColor(); // Get a random background color

  return (
    <>
   

    {isLoggedIn && userEmail ? (
        <div className="relative" ref={dropdownRef}>
          <div
            style={{
                backgroundColor: "#c300f9",
                color: "#fff",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "semibold",
                fontSize: "24px",
            }}
            onClick={toggleDropdown}
            >
            {firstLetter}
        
            </div>
         {/* <UserCircle className="w-8 h-8 text-[#c300f9] cursor-pointer" strokeWidth={1.5} onClick={toggleDropdown} />*/}

          {dropdownVisible && (
            <motion.div
              className="absolute -right-10 top-full mt-2 bg-white border border-gray-100 p-1 shadow-lg z-10 rounded-md w-48"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center gap3">
                <p className="text-sm font-semibold text-gray-600 border-b p-1">{userEmail}</p> 
              <button
                onClick={() => {
                  handleNavigation()
                  toggleDropdown()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#c300f9]/10 rounded-md transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                My Dashboard
              </button>
              <div className="my-1 border-t border-gray-100"></div>
              <button
                onClick={() => {
                  logoutUser()
                  toggleDropdown()
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#c300f9]/10 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Log out
              </button>
              </div>
             
            </motion.div>
          )}
        </div>
      ): <></>}
    </>
    
  );
};

export default Avatar;

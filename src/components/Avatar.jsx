import { motion } from "framer-motion";
import { LayoutDashboard, LogOut, User2 } from "lucide-react";

const Avatar = ({
  toggleDropdown,
  dropdownVisible,
  isLoggedIn,
  logoutUser,
  handleNavigation,
  dropdownRef,
  userEmail,
  navigate,
  avatarRef,
}) => {
  const firstLetter = userEmail ? userEmail[0].toUpperCase() : "";

  return (
    <>
      {isLoggedIn && userEmail ? (
        <div className="relative" ref={dropdownRef}>
          <div
            ref={avatarRef}
            style={{
              backgroundColor: "#c300f9",
              color: "#fff",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={toggleDropdown}
          >
            {firstLetter}
          </div>

          {dropdownVisible && (
            <motion.div
              className="absolute -right-10 top-full mt-2 bg-white border border-gray-100 p-1 shadow-lg z-50 rounded-md w-48"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center gap-1">
                <button
                   onClick={() => {
                    navigate("/profile");
                    setTimeout(() => toggleDropdown(), 100);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#c300f9]/10 rounded-md transition-colors"
                >
                  <User2 className="w-4 h-4" />
                  Profile
                </button>
                <div className="my-1 border-t border-gray-100 w-full" />
                <button
                  onClick={() => {
                    handleNavigation();
                    toggleDropdown();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#c300f9]/10 rounded-md transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  My Dashboard
                </button>
                </div>
                <div className="my-1 border-t border-gray-100 w-full" />
                <button
                  onClick={() => {
                    logoutUser();
                    toggleDropdown();
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#c300f9]/10 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
            </motion.div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Avatar;

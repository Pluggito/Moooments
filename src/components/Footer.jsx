import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  
  // Array of paths where footer should not be fixed
  const nonFixedPaths = ['/'];
  
  return (
    <footer className={`w-full items-center mt-3 text-center flex flex-col py-10 pointer-events-none shadow-xs z-50 
      ${nonFixedPaths.includes(location.pathname) ? '-translate-x-1/2 left-1/2 bottom-0 fixed ' : ''}`}>
      {/*w-full fixed mt-auto flex flex-col justify-center items-center text-center p-4 gap-4 bg-transparent border */}
      {/* First Section */}
      {location.pathname === "/" && (
        <div className="px-2">
          <p className="text-base sm:text-lg font-medium text-gray-600">
            Want to share more memories? Keep uploading!
          </p>
        </div>
      )}

      {/* Second Section - Links */}
      <div className="w-full max-w-md px-2 ">
        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
          <li className="cursor-pointer hover:text-[#c300f9] transition-colors">
            Privacy Policy
          </li>
          <hr className="w-0.5 h-3 bg-gray-800 hidden sm:block" />
          <span className="block sm:hidden">•</span>
          <li className="cursor-pointer hover:text-[#c300f9] transition-colors">
            Terms of Service
          </li>
          <hr className="w-0.5 h-3 bg-gray-800 hidden sm:block" />
          <span className="block sm:hidden">•</span>
          <li className="cursor-pointer hover:text-[#c300f9] transition-colors">
            Cookie Policy
          </li>
        </ul>
      </div>

      {/* Third Section - Copyright */}
      <div>
        <p className="text-gray-800 text-xs sm:text-sm font-medium">
          © 2025. <span className="text-[#c300f9]">Moooments</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

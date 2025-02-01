import { useLocation } from "react-router-dom"

const Footer = () => {
    const location = useLocation();

    return (
      <div className={`flex flex-col justify-center items-center text-center w-full p-4 gap-4
        ${location.pathname === '/' ? 
          "fixed bottom-0 left-0 right-0 bg-transparent pb-6" : 
          "my-8"}`}
      >
          {/*--- first section---- */}
          {location.pathname === "/" && (
            <div className=" px-4">
              <p className="text-base sm:text-lg font-medium text-gray-600">Want to share more memories? Keep uploading!</p>
            </div>
          )}
  
          {/*-----second section---- */}
          <div className="w-full max-w-md px-4">
              <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-gray-600 text-sm sm:text-base">
                  <li className="cursor-pointer hover:text-[#c300f9] transition-colors">Privacy Policy</li>
                  <hr className="w-0.5 h-3 bg-gray-800 hidden sm:block"/>
                  <span className="block sm:hidden">•</span>
                  <li className="cursor-pointer hover:text-[#c300f9] transition-colors">Terms of Service</li>
                  <hr className="w-0.5 h-3 bg-gray-800 hidden sm:block"/>
                  <span className="block sm:hidden">•</span>
                  <li className="cursor-pointer hover:text-[#c300f9] transition-colors">Cookie Policy</li>
              </ul>
          </div>
  
          {/*----third section----- */}
          <div className="mt-2">
              <p className="text-gray-800 text-xs sm:text-sm font-medium">
                © 2025. <span className="text-[#c300f9]">Moooments</span>
              </p>
          </div>
      </div>
    )
}
  
export default Footer
  
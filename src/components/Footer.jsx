import { useLocation } from "react-router-dom"




const Footer = () => {

    const location = useLocation();

    return (
      <div className={`flex flex-col justify-center items-center text-center mx-auto  ${location.pathname === '/' ? "sm:absolute left-0 right-0 bottom-0 sm:bottom-3 w-auto my-auto" : ""}`}>
          {/*--- first section---- */}
          {location.pathname === "/" && (
        <div>
          <p className="text-lg">Want to share more memories? Keep uploading!</p>
        </div>
      )}
  
          {/*-----second section---- */}
          <div>
              <ul className="flex flex-row items-center justify-between gap-3 text-gray-600">
                  <p className="cursor-pointer">Privacy Policy</p>
                  <hr className="w-0.5 h-3 bg-gray-600"/>
                  <p className="cursor-pointer">Terms of Service</p>
                  <hr className="w-0.5 h-3 bg-gray-600"/>
                  <p className="cursor-pointer">Cookie Policy</p>
              </ul>
            </div>
  
          {/*----third section----- */}
          <div>
              <p className="text-gray-500 text-sm">© 2025. <span className="text-[#c300f9]">Moooments</span> </p>
          </div>
        
  
      </div>
    )
  }
  
  export default Footer
  
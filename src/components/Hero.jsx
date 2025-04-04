import { assets } from "../assets/asset"
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Camera, Share2, Download } from "lucide-react"
import PageLoader from "../components/PageLoader";
import { image } from "motion/react-client";


const Hero = ({loading, setLoading}) => {
    const navigate = useNavigate();
    
    const {isLoggedIn} = useContext(AuthContext)

    const handleClick = async() => {
      setLoading(true);
      // Navigate after animation completes
      setTimeout(() => {
        if(!isLoggedIn){
          navigate('/signup')
        }
        else if(isLoggedIn){
          navigate('/create-album')
        }
        setLoading(false);
      }, 1500);
    };

    const images = [assets.img_1, assets.img_2, assets.img_3]

  return (
      <main className="flex items-center justify-center py-[5%] my-15 xl:my-11 overflow-x-hidden ">
        {loading && <PageLoader />}
        <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ background: `url(${assets.hero_image})` }}
      />

        <section className="w-full relative z-[30]">
          <div className="flex flex-col items-center justify-center py-5">
            <div className="w-full text-center px-1 sm:px-10 relative ">
              <img 
                className="absolute left-1/2 -translate-x-1/2 -top-16 w-16 h-16 
                  sm:w-16 sm:h-16 sm:-top-20
                  lg:left-[85%] lg:-translate-x-0 lg:-top-20 lg:w-24 lg:h-24
                  transform rotate-[15deg]
                  xl:left-[68%] hidden"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHwklEQVR4nO2dXYwkVRXHL6LIwgZwSE/X/39runVYBSayKy4ICdkXPxAXA8iDAomBJ4ISEJHV+IZ8uBB9UmNCENH4JlmjkCDIl3wpLGETXpCvABtZF+KyBnbZjwdZ858+RYqyZrp6epetqj6/ZDLVXX2r751/3XvuOXXvmRAcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EOOCSPB/ADAPeT/AfJnST31fhnp+qp+qveqn8rbpMkSU4B8EAN/sD7xv0B8DiAM0ITWb169UcA/JLku9aYNwHcBuBc3W3dbvfIUGO63e6R1qvPA/BrANtNmHcB/ELtC00hTdMpAA+ZELsA3DA1NXVUaDCzs7NHk7xR7bF2Pdjr9T4WGtIzHrRKb0mS5NTQIkh+huRm6y2PzM3NHRbqjA1TEuOfaZrGss/MzMwQwBUk7yX5MoDdB9s+cFDnF6q0McaYAnjNyv081BX1BhtjNUx9tni+3+8fA+CnJP+d2ZNut/uJNE2XhWZOVnZbe1eHOpIbqm4onkuS5EQAL5K8ZXp6uhtaAMn11t77Qt0AcEI2myoacIlB8vUkSb4ZWsTs7OzRudnXp0KdMOdJgtxWMky90DYxMgDcboKsC3XCPHAJcm7hfdmMW0JLAfA1E+QvoU4AeL7YdTWbkgFvi80oQ86j3YjPhTpBcocq1ul0lmfvAbiS5K9Ci+l0OsvtRtwR6kQ2ly+8Jz/jnNByWNL2ugrySrfb/XhoOWyKIHIQm+j0tVaQ2lXyANE6QUj+GMDeXExpb5m3T/JYAH8i+U7F+NQ79vlj92dbWy+IBFDIPrw/fL+n8LFDAfwNwPVVh0F9TsKqnMpXbEqV+n651YKUfY7/b49+aM7XISNW7RCVU/mwn1BAsdWCANhWEgrflp2PMa4i+QbJmSXWTR7qG7rOUsqXXG9fqwVZjBUrVnwUwDPjxsJUXtfR9catkxzeiRRkamrqKAUrSW4Yu4KD+mzQ9cZ9nNxaG0LyqyQ35mdYfP+wtYfk7wAcsT/qqOsA+C3Jtxf4PtVjY4zx7ImzISbGKyS/UJfn0nNzc4eR/CLJV2OMayfKhpB8Ksb4+aV+X4xxlabAAJ4A8C/zXfT77wCuizGuXOq1JQqAJydKEP0Bl9IzYoyfJPkH3cXmUJ7R6/Wg1S76rdd6385vmJmZOa54jTRNV5D8q1YnarmSXufPq14lflC7BVlKA2KMa/UomOTVw2ZLOk/ye/bo+KzCdz8M4DtaDAfgKr0epX6tnGWN2oAY41qt80rT9HP21ocAXATgrsKQdSfJC3Teyp1m68PeE0U9I1s5aSsUd45Tv4kTJA6GqdczMaanp2cBbLJh5+t6Mqkhy55QfkN3PMmntcTIyp9GcqvK2Xc/HGP8rsTQb11nnPpNnCAc2Iyrc2JsAXDpkDKXaTFbJgrJawDcoWPZDFvqukNLl4o2ZFj9igvqJkqQOAibvGo2Q8PUpmFi5L7jMs3mVK7f7x9u09lKs69R6j5RggC4Xouc7fiisuFlSL0e0TBmx+sB/KhiORekDPMz5vdkyIDLZoQRkIHXMxErv8ZC8VXKuSBlaOYk/yI7luEOI6AF37I5uUXe88fDcEEqOJBYgjNp0eI9VRw+F6QCALaM00Ns64D3kANkQ+7MDHRVAFxI8o927DZkPwhynWJTVuaCsjDHYpB8LJsI2Czr2orl3KiXIb8h74fIA5d/ESpA8nI938j5IZvTND2pYlkXZCEUtVWgUMfyvG072beGiaFtdUmS9PUawPcB/H6xMoXyLshCKISuWJZiUpko8sBJPqphTFNbzaDMgF9ow9TGbBlrjPF0xbKyMEoVXJAhJElylmZLmSg2fM07fRbbUrR3iwy42Yws2nu6nT+zqhguyAiikNyqQOGw5yGyGRqm9PlRxXBBRmB6EO29w/aKa9a0Rr6JhizzxNfYZszNshmjDFMuyBjEGFcqUGjLS98bsuz1tVVnUy7ImM/UPwjy4ZZJCr9v1BKgUEMAfGniVp1oMZocPjW+Lj1lbhB8PFP2J0mSr7ROkGE7qGzhwpMLrVzkB5/rRHboicXEsC0Ou4a1va495OVsYUFbSAfP419sqiD3FBMJtCRRwN1NEOTtkn3qVygbW2gRGCzW/nb2WivpTZC3QlMyOXQ6nSS0gF6vB7Une2BW60wOSlFkFTuv8P5PSN4aWgAGe1Vuyr+XJMn5diPeG+qExY32FYcoywak3nNxaDAkL1EvKG72AfAbE+SaUCdyXfdN5ZEqyaW1tamikLzE6n98yc32H7Vby11D3cjl572x5NwJ1lNubYpN6Q22NygV4XNliZRJ3lzbjHJZHkLLQbhbxwukWr3Zci7eLnujh091Sb+Rpuky1UdTWw1Ftjv4prI9iVr4bTkX/1uWX7I2KMmw3TWv6QneIrOVy81PeSnLhcuD76kreedLJP+sqW1+NlXcZm0Pw1TuZ6EBeXvnh67Cfo5WQPLkRuXtFcr4nMtQqm69vmjom0a/3z9Gw63tDFa7HmhEZut8T1GS4Vzu9+2Z3ZCBz3v0daTT6Sy3iUhmT+ZnU7IZNkx9ODSRbrf7aVu1ftBtBMe3MffV2oCPgm1LW6dEMPb/Q+ZzNNb4ZwfJZy1N4bpa+hmO4ziO4ziO4ziO4ziO4ziO4ziOE8bkf73U97NyRGv2AAAAAElFTkSuQmCC" 
                alt="camera-icon"
              />

              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black text-balance inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            Capture Every&nbsp;
            <span className="text-[#c300f9] font-bold">
              <Typewriter
                    words={["Moooments!", "Laughter!", "Love!", "Joy!", "", "Moooments!"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={300}
                deleteSpeed={75}
                delaySpeed={1500}
              />
            </span>
            <br/> Share Every Memory
              </motion.h1>
        </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[90%] sm:max-w-[75%] mx-auto px-4 mt-7">
            <motion.button
                type="button"
                className="group relative overflow-hidden rounded-full w-full sm:w-[220px] h-[50px] font-medium text-gray-800 bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/eventlink")}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-5 flex items-center justify-center gap-2 font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 5L15 12L9 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Enter Event Link</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>

              
              <motion.button
                type="button"
                className="group relative overflow-hidden rounded-full w-full sm:w-[280px] h-[50px] font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={handleClick}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
              >
                <span className="relative z-5 flex  justify-center items-center content-center gap-2">
                  <span>Create your Event Album</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#c300f9] to-[#a000c7]"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#d42fff] to-[#b700e5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
        </div>
        </div>

        <section className="w-full container mx-auto mt-7 px-4 mb-20">
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >

        {images.map((imgSrc, index) => (
            <motion.div
            key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md"
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              transition={{ duration: 0.3 }}
            >
              <img
                 src={imgSrc}  // Use the imported path directly
                 alt={`Event photo ${index + 1}`}
                 className="w-full h-full object-cover"
                 loading="lazy"
               />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="w-full py-20 bg-white rounded shadow-lg">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to create and share your event memories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StepCard
              number="01"
              icon={<Camera className="h-8 w-8 text-white" />}
              title="Create an Event"
              description="Set up your event in seconds. Add details and customize privacy settings."
            />
            <StepCard
              number="02"
              icon={<Share2 className="h-8 w-8 text-white" />}
              title="Share with Guests"
              description="Invite guests with a simple link or QR code. No app download required."
            />
            <StepCard
              number="03"
              icon={<Download className="h-8 w-8 text-white" />}
              title="Collect Memories"
              description="Everyone uploads photos to one place. Download or share the complete collection."
            />
          </div>
        </div>
      </section>

      </section>

    </main>
    );
};


const StepCard = ({ number, icon, title, description }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#c300f9] to-[#a000c7] flex items-center justify-center">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-[#c300f9] flex items-center justify-center text-sm font-bold text-[#c300f9]">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default Hero


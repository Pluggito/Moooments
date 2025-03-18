import { assets } from "../assets/asset"
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const Navigate = useNavigate();
    
    const handleClick = () => {
      // Navigate after animation completes
      setTimeout(() => Navigate('/create-album'), 300);
    };

    return (
      <main className="flex items-center justify-center py-[50%] lg:py-[12%] my-15 xl:my-11 overflow-x-hidden ">
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
                  xl:left-[68%]"
                src="data:image/png;base64,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" 
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
              <button
                type="button"
                className="border-2 border-black rounded w-full sm:w-[207px] h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
                cursor-pointer shadow-md relative z-[30]"
                onClick={() => Navigate('/eventlink')}
              >
                Enter Event Link
              </button>
              
              <motion.button
                type="button"
                className="rounded w-full sm:w-[292px] h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-colors cursor-pointer shadow-md relative z-[30]"
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 500,
                  damping: 25
                }}
              >
                Create your Event Album
              </motion.button>
            </div>
          </div>
        </section>
      </main>
    );
};

export default Hero

import { assets } from "../assets/asset"
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";


const Hero = () => {
    const Navigate = useNavigate();
  return (
    <main className="border flex items-center justify-center py-15 sm:py-45 md:py-50 lg:py-30 pointer-events-none mt-15">
        <div 
        className="fixed z-10 inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ background: `url(${assets.hero_image})` }}
      />
        {/*Contecnt Container*/}

      <section className=" w-full border-4 border-amber-950 ">
        {/*Heading*/}
        <div className="flex flex-col items-center justify-center py-5 ">
        <div className="w-full text-center sm:px-10 ">
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-black tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            Capture Every&nbsp;
            <span className="text-[#c300f9] font-bold">
              <Typewriter
                words={["Moooments!", "Laughter!", "Love!", "Joy!", "Adventures!", "Moooments!"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={300}
                deleteSpeed={75}
                delaySpeed={1500}
              />
            </span>
            <br/> Share Every Memory
          </motion.p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[90%] sm:max-w-[75%] mx-auto px-4 mt-5">
          <button
            type="button"
            className="border-2 border-black rounded w-full sm:w-[207px] h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
            cursor-pointer shadow-md"
            onClick={() => Navigate('/eventlink')}
          >
            Enter Event Link
          </button>
          <button
            type="button"
            className="rounded w-full sm:w-[292px] h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md"
            onClick={() => Navigate('/create-album')}
          >
            Create your Event Album
          </button>
        </div>
        </div>
      </section>

      
    </main>
  )
}

export default Hero

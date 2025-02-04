import { useNavigate } from "react-router-dom";
import { assets } from "../assets/asset";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const Navigate = useNavigate();

  return (
    <div className="relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ background: `url(${assets.hero_image})` }}
      />
      
      {/* Content Container */}
      <div className="relative flex flex-col">
        {/* Heading */}
        <div className="w-full text-center mx-auto px-4 mt-[30vh] mb-8">
          <motion.p 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black tracking-wide"
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
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
            <br/> Share Every Memory
          </motion.p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[90%] sm:max-w-[75%] mx-auto px-4">
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
    </div>
  );
};

export default Home;

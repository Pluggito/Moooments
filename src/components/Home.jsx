import { useNavigate } from "react-router-dom";
import { assets } from "../assets/asset"

const Home = () => {
  const Navigate = useNavigate()
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ background: `url(${assets.hero_image})` }}
      />
      
      {/* Content Container */}
      <div className="relative flex flex-col min-h-screen">
        {/* Heading */}
        <div className="max-w-4xl text-center mx-auto px-4 mt-[25vh] mb-8">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black tracking-wide">
            Capture Every <span className="text-purple-700 font-bold">Moooments!</span> Share Every Memory
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[90%] sm:max-w-[75%] mx-auto px-4">
          <button
            type="button"
            className="border-2 border-black rounded w-full sm:w-[207px] h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
            cursor-pointer shadow-md"
            onClick={()=>Navigate('/eventlink')}
          >
            Enter Event Link
          </button>
          <button
            type="button"
            className="rounded w-full sm:w-[292px] h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md"
            onClick={()=>Navigate('/create-album')}
          >
            Create your Event Album
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

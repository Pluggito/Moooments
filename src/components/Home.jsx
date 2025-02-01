import { useNavigate } from "react-router-dom";
import { assets } from "../assets/asset"

const Home = () => {

  const Navigate = useNavigate()
  return (
    <div>
      {/* Background Image */}
      <div className="bg-cover bg-center bg-no-repeat h-screen relative flex justify-center items-center opacity-8"
           style={{ background: `url(${assets.hero_image})` }}>
      </div>
      <div className="max-w-4xl text-center absolute top-1/4 left-0 right-0 mx-auto ">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-black tracking-wide">
            Capture Every <span className="text-purple-700 font-bold">Moooments!</span> Share Every Memory
          </p>
        </div>

      {/* Buttons */}
      <div className="absolute top-1/2 right-0 left-0 mx-auto flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[90%] sm:max-w-[75%] ">
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
  );
}

export default Home;

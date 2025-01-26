import { assets } from "../assets/asset"

const Home = () => {
  return (
    <div>
         <div className="bg-cover bg-center bg-repeat h-screen relative justify-center flex overflow-hidden opacity-8"
    style={{background: `url(${assets.hero_image})`}}></div>

    <div className=" max-w-[763px] text-center absolute top-70 justify-center mx-auto left-0 right-0">
        <p className="text-6xl font-medium text-black ">
          Capture Every <span className="text-purple-700 font-bold">Moooments!</span> Share Every Memory
        </p>
      </div>
      <div className="absolute top-100  right-0 left-0 justify-center my-6 items-center text-center  flex flex-col sm:flex-row md:flex-row gap-3 max-w-7xl mx-auto ">
        <button
            type="button"
            className="border-2 border-black rounded w-[207px] h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
            cursor-pointer shadow-md">Enter Event Link</button>
        <button 
        type="button"
        className="rounded w-[292px] h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md">Create your Event Album</button>
      </div>

    </div>
   
  )
}

export default Home

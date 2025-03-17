

const EventLink = () => {

 
  return (
    <div className="items-center md:mx-auto lg:mx-auto max-w-xl py-38 lg:py-25 sm:h-full">
        
        <div className="flex flex-col justify-center  items-center sm:h-[338px] h-[255px] mx-auto gap-5 ">
             <p className="text-3xl mb-2 font-semibold  w-full text-center">Place Your Event Link Here!</p>
             <div className="flex flex-col justify-center items-center gap-4 px-3 py-20 w-3/4 bg-[#c300f9] rounded h-[50%]">
                <input type="link" className="w-full p-2 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
                placeholder="Event Link" 
                name="event-link"/>
                <button className="rounded sm:w-[101px] sm:h-[44px] w-1/2 font-bold hover:bg-gray-800 bg-black text-slate-100 hover:text-white transition-all duration-300
                cursor-pointer shadow-md p-2">Next</button>
             </div>
          
        </div>
      
    </div>
  )
}

export default EventLink


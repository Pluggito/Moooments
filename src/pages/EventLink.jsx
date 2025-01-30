

const EventLink = () => {
  return (
    <div className="items-center mx-auto max-w-4xl my-48 p-8
    sm:h-full ">
        
        <div className="flex flex-col justify-center  items-center  sm:w-[551px] w-full sm:h-[230px] h-[250px] mx-auto gap-5 ">
             <p className="text-2xl mb-2 font-semibold  w-full text-center">Place Your Event Link Here!</p>
             <div className="flex flex-col justify-center items-center gap-4 p-6 w-full bg-[#c300f9] rounded-lg">
             <input type="link" className="w-full sm:w-3/4 p-3 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
             placeholder="Event Link" 
             name="event-link"/>
            <button className="rounded sm:w-[101px] sm:h-[44px] w-1/2 font-bold hover:bg-gray-800 bg-black text-slate-100 hover:text-white transition-all duration-300
            cursor-pointer shadow-md p-2">Enter</button>
             </div>
          
        </div>
      
    </div>
  )
}

export default EventLink

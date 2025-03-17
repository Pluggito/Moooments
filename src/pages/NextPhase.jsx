import { useNavigate } from "react-router-dom"

const NextPhase = () => {
    const Navigate = useNavigate();
  return (
    <div>
        <div className="items-center flex flex-col
        py-50 my-10 gap-2">
                <h1>Your event album is ready!</h1>
                <button
                className="border-2 border-black rounded w-3/4 sm:w-[207px] h-[44px] font-bold hover:bg-black hover:text-white transition-all duration-300
                cursor-pointer shadow-md" onClick={() => Navigate('/dashboard')}>Go to Dashboard</button>
        </div>
      
    </div>
  )
}

export default NextPhase

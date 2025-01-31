import { useState } from "react"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const ForgetPassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


  return (
    <div>
        <div className="items-center mx-auto max-w-4xl my-48 p-8
    sm:h-full ">
        
        <div className="flex flex-col justify-center  items-center  sm:w-[551px] w-full sm:h-[230px] h-[250px] mx-auto gap-5 ">
             <p className="text-2xl mb-2 font-semibold  w-full text-center">Change your password</p>
             <div className="flex flex-col justify-center items-center gap-4 p-6 w-full shadow-md bg-slate-100 rounded-lg">
             <div className="relative w-3/4 ">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    className="w-full  p-3 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
                                    autoComplete="off"
                                    required
                                    value={newPassword}
                                    name="password"
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 top-0 flex items-center text-gray-500 hover:text-black"
                                >
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </button>
                            </div>

                            <div className="relative w-3/4 ">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full sm:w-full p-3 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
                                    autoComplete="off"
                                    required
                                    value={newPassword}
                                    name="password"
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 top-0 flex items-center text-gray-500 hover:text-black"
                                >
                                    {showPassword ? (
                                        <FontAwesomeIcon icon={faEye} />
                                    ) : (
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    )}
                                </button>
                            </div>

                            <button className="rounded sm:w-[101px] sm:h-[44px] w-1/2 font-bold hover:bg-gray-800 bg-black text-slate-100 hover:text-white transition-all duration-300
            cursor-pointer shadow-md p-2">Enter</button>


                        </div>
           
             </div>
          
        </div>
      
    </div>
  )
}

export default ForgetPassword



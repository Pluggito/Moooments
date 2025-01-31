import { assets } from "../assets/asset";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [isMenu, setIsMenu] = useState("Sign Up");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value.trim() });
    };

    const slideVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
    };

    return (
        <div className="items-center justify-center text-center m-auto max-w-7xl p-2">
            <div className="transform tracking-wide px-1">
                <h1 className="sm:text-[36px] font-medium text-black ">
                    Login to your <span className="text-[#c300f9] font-bold sm:text-[40px]">MooomentS!</span> Account
                </h1>
                <p>
                    Or create a <span className="text-indigo-600">new account</span> for free
                </p>
            </div>

            <form className="shadow-lg rounded-lg my-4 max-w-xl mx-auto items-center px-6 py-4">
                {/* Top Tabs with Color Slider */}
                <div className="relative justify-center flex flex-row gap-1 tracking-wide">
                    {/* Slider background */}
                    <div
                        className={`absolute top-0 left-0 h-full bg-[#c300f9] transition-transform duration-500 ease-in-out`}
                        style={{
                            width: "50%",
                            transform: isMenu === "Login" ? "translateX(0%)" : "translateX(100%)",
                        }}
                    ></div>

                    {/* Tabs */}
                    <p
                        className={`w-1/2 sm:w-full p-2 font-medium cursor-pointer relative z-10 ${
                            isMenu === "Login" ? "text-white" : "text-black"
                        }`}
                        onClick={() => setIsMenu("Login")}
                    >
                        Login
                    </p>
                    <p
                        className={`w-1/2 sm:w-full p-2 font-medium cursor-pointer relative z-10 ${
                            isMenu === "Sign Up" ? "text-white" : "text-black"
                        }`}
                        onClick={() => setIsMenu("Sign Up")}
                    >
                        Signup
                    </p>
                </div>

                <button className="w-full sm:w-1/2 p-3 flex items-center justify-center gap-4 text-black text-md font-semibold shadow-md rounded-lg hover:bg-black hover:text-slate-100 duration-500 transition-all ease hover:opacity-90 mx-auto my-6 cursor-pointer">
                    <span>
                        <img
                            src={assets.google_icon}
                            alt="Google"
                            className="w-[25px] mr-3"
                        />
                    </span>
                    Sign in with Google
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 my-6">
                    <hr className="flex-grow border-gray-400" />
                    <div className="w-10 h-10 bg-gray-100 text-black flex items-center justify-center rounded-full">
                        Or
                    </div>
                    <hr className="flex-grow border-gray-400" />
                </div>

                {/* User Info Form */}
                {isMenu === "Login" ? (
                    <motion.div
                        key="login"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="sm:w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-4"
                                autoComplete="off"
                                required
                                value={userData.email}
                                onChange={handleChange}
                                name="email"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none"
                                    autoComplete="off"
                                    required
                                    value={userData.password}
                                    onChange={handleChange}
                                    name="password"
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
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="termsAndConditions"
                                checked={termsAndConditions}
                                onChange={() => setTermsAndConditions(!termsAndConditions)}
                                required
                                className="w-3 h-3 cursor-pointer accent-[#c300f9]"
                            />
                            <label htmlFor="termsAndConditions" className="text-gray-600 text-sm">
                                Remember me
                            </label>
                        </div>
                        <button className="rounded sm:w-[101px] sm:h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md p-2 mt-9">
                            {isMenu}
                        </button>
                        <NavLink to="/forgetpassword">
                        <p className="mt-4 text-gray-500 hover:text-black cursor-pointer">
                            Forgot Password?
                        </p>
                        </NavLink>
                        
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="sm:w-full">
                            <input
                                type="name"
                                placeholder="Name"
                                className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-4"
                                autoComplete="off"
                                required
                                value={userData.name}
                                onChange={handleChange}
                                name="name"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-4"
                                autoComplete="off"
                                required
                                value={userData.email}
                                onChange={handleChange}
                                name="email"
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none"
                                    autoComplete="off"
                                    required
                                    value={userData.password}
                                    onChange={handleChange}
                                    name="password"
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
                        </div>
                        <div className="flex flex-col text-left text-sm">
                            <div className="flex items-center gap-3 mt-2">
                                <input
                                    type="checkbox"
                                    id="termsAndConditions"
                                    checked={termsAndConditions}
                                    onChange={() => setTermsAndConditions(!termsAndConditions)}
                                    required
                                    className="w-4 h-4 cursor-pointer accent-[#c300f9]"
                                />
                                <label htmlFor="termsAndConditions" className="text-gray-500 text-sm max-w-md">
                                    I agree to the <span className="underline">Terms of Service</span>, <span className="underline">General Terms and Conditions</span> <span className="underline"> and Privacy Policy</span>.
                                </label>
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    checked={newsletter}
                                    onChange={() => setNewsletter(!newsletter)}
                                    className="w-5 h-5 cursor-pointer accent-[#c300f9]"
                                />
                                <label htmlFor="newsletter" className="text-gray-500 text-sm">
                                    Get the latest on Moooments' products and join the waitlist for our full e-ticketing platform launch!
                                </label>
                            </div>
                        </div>
                        <button className="rounded sm:w-[101px] sm:h-[44px] font-semibold text-white bg-[#c300f9] hover:bg-[#a000c7] transition-all duration-300 cursor-pointer shadow-md p-2 mt-9 mb-5">
                            {isMenu}
                        </button>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default SignUp;

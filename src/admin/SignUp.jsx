import { assets } from "../assets/asset";
import { useContext, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [isMenu, setIsMenu] = useState("Sign Up");
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Get auth context values
    const { registerUser, loginUser, loading, error: authError } = useContext(AuthContext);

    const [error, setError] = useState({
        email: '',
        password: '',
        userName: '',
        general: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.trim()
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const errors = {};

        // Reset errors
        setError({});

        if(!userName){
            errors.userName = 'Name is required';
        }

        // Validate email
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        // Validate password
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        // Validate terms and newsletter
        if (!termsAndConditions || !newsletter) {
            errors.general = 'Please accept all required fields';
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            setTimeout(() => setError({}), 3000);
            return;
        }


 

        // Call registerUser with form data
        await registerUser({
            email: formData.email,
            password: formData.password,
            first_name: userName,
            last_name: lastName,
            
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginUser({
            email: formData.email,
            password: formData.password
        });
    };

    const slideVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
    };

    const getPasswordStrength = (password) => {
        if (!password) return '';
        if (password.length < 6) return 'bg-red-500';
        if (password.length < 8) return 'bg-yellow-500';
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) return 'bg-green-500';
        return 'bg-yellow-500';
    };

    return (
        <section className="items-center justify-center text-center m-auto max-w-7xl   mt-2">
            <div className="transform tracking-wide px-1">
                <h1 className="sm:text-[36px] font-medium text-black ">
                    Login to your <span className="text-[#c300f9] font-bold sm:text-[40px]">MooomentS!</span> Account
                </h1>
                <p>
                    Or create a <span className="text-indigo-600">new account</span> for free
                </p>
            </div>

            <form className="shadow-lg rounded-lg my-4 max-w-xl mx-auto items-center px-6 py-4 bg-white">
                {/* Top Tabs with Color Slider */}
                <div className="relative justify-center flex flex-row gap-1 tracking-wide bg-slate-50">
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

                <button className="w-full sm:w-1/2 p-3 flex items-center justify-center gap-4 text-black text-md font-semibold shadow-md rounded-lg hover:bg-black hover:text-slate-100 duration-500 transition-all ease hover:opacity-90 mx-auto my-6 cursor-pointer bg-slate-50">
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

                {/* Display auth errors */}
                {authError && (
                    <div className="text-red-500 text-sm mb-4">
                        {authError}
                    </div>
                )}

                {error.general && <p className="mt-2 text-red-700">{error.general}</p>}

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
                                className={`w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-1
                                    ${error.email ? 'border-red-500' : ''}`}
                                autoComplete="off"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                            />
                            {error.email && (
                                <p className="text-red-500 text-xs mb-2">{error.email}</p>
                            )}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none"
                                    autoComplete="off"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                {formData.password && (
                                    <div className={`h-1 mt-1 rounded-full ${getPasswordStrength(formData.password)}`} />
                                )}
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
                        <button 
                            onClick={handleLogin}
                            disabled={loading}
                            className={`rounded sm:w-[101px] sm:h-[44px] font-semibold text-white 
                                ${loading ? 'bg-gray-400' : 'bg-[#c300f9] hover:bg-[#a000c7]'}
                                transition-all duration-300 cursor-pointer shadow-md p-2 mt-9 mb-5`}
                        >
                            {loading ? 'Processing...' : isMenu}
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
                                placeholder="Firstname"
                                className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-4"
                                autoComplete="off"
                                required
                                value={userName}
                                onChange={(e)=>setUserName(e.target.value)}
                                name="name"
                            />
                            <input
                                type="name"
                                placeholder="Lastname"
                                className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-4"
                                autoComplete="off"
                                required
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                name="name"
                            />
                            {error.userName && <p className="text-red-500 text-xs mb-2">{error.userName}</p>}
                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none mb-1
                                    ${error.email ? 'border-red-500' : ''}`}
                                autoComplete="off"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                            />
                            {error.email && (
                                <p className="text-red-500 text-xs mb-2">{error.email}</p>
                            )}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    title="Must have minimum of 8 characters"
                                    placeholder="Password"
                                    className="w-full p-3 rounded-lg bg-transparent text-black hover:bg-slate-50 shadow-md focus:outline-none"
                                    autoComplete="off"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                {formData.password && (
                                    <div className={`h-1 mt-1 rounded-full ${getPasswordStrength(formData.password)}`} />
                                )}
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
                                    required
                                    onChange={() => setNewsletter(!newsletter)}
                                    className="w-5 h-5 cursor-pointer accent-[#c300f9]"
                                />
                                <label htmlFor="newsletter" className="text-gray-500 text-sm">
                                    Get the latest on Moooments&apos; products and join the waitlist for our full e-ticketing platform launch!
                                </label>
                            </div>
                        </div>
                        <button 
                            onClick={handleSignup}
                            disabled={loading}
                            className={`rounded sm:w-[101px] sm:h-[44px] font-semibold text-white 
                                ${loading ? 'bg-gray-400' : 'bg-[#c300f9] hover:bg-[#a000c7]'}
                                transition-all duration-300 cursor-pointer shadow-md p-2 mt-9 mb-5`}
                        >
                            {loading ? 'Processing...' : isMenu}
                        </button>
                    </motion.div>
                )}
            </form>
        </section>
    );
};

export default SignUp;

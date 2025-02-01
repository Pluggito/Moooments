
import { useEffect, useState } from "react"
import { faCircleCheck, faCircleXmark, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Password = ({text1, text2, button, heading}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (newPassword && confirmPassword) {
            setPasswordMatch(confirmPassword === newPassword);
        } else {
            setPasswordMatch(false);
        }
    }, [newPassword, confirmPassword]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        
        if (!newPassword || !confirmPassword) {
            setError('Please fill in all required fields');
            setTimeout(() => setError(''), 3000);
            return;
        }

        if (!passwordMatch) {
            setError('Passwords do not match');
            setTimeout(() => setError(''), 3000);
            return;
        }

        console.log('Password updated successfully');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMatch(false);
    }

    return (
        <div>
            <div className="items-center mx-auto max-w-4xl my-48 p-8 sm:h-full">
                <div className="flex flex-col justify-center items-center sm:w-[551px] w-full sm:h-[230px] h-[250px] mx-auto gap-5">
                    <p className="text-2xl mb-2 font-semibold w-full text-center">{heading}</p>
                    <div className="flex flex-col justify-center items-center gap-4 p-6 w-full shadow-md bg-slate-100 rounded-lg">
                        <div className="relative w-3/4">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={text1}
                                className="w-full p-3 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
                                autoComplete="off"
                                required
                                value={newPassword}
                                name="password"
                                onChange={(e) => setNewPassword(e.target.value)}
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

                        <div className="relative w-3/4">
                            <input
                                type="password"
                                placeholder={text2}
                                className="w-full p-3 rounded-lg text-black hover:bg-slate-50 border border-gray-500 focus:outline-none bg-white"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {confirmPassword && (
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 top-0 flex items-center"
                                >
                                    <FontAwesomeIcon 
                                        icon={passwordMatch ? faCircleCheck : faCircleXmark} 
                                        className={passwordMatch ? "text-green-500" : "text-red-500"} 
                                    />
                                </button>
                            )}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="button"
                            onClick={handlePasswordSubmit}
                            className="rounded sm:w-[201px] sm:h-[44px] w-3/4 font-bold  bg-[#c300f9] hover:bg-[#a000c7] text-slate-100 hover:text-white transition-all duration-300 cursor-pointer shadow-md p-2"
                        >
                            {button}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password



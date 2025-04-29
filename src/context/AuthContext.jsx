import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => 
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [userEmail, setUserEmail] = useState(() => 
        localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : null  
    );
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (userData) => {
        setLoading(true);
        setError("");
      
        try {
          const registerRes = await axios.post(`${BASEURL}auth/v1/register/`, userData);
      
          if (registerRes.status === 201) {
            const loginData = {
              email: userData.email,
              password: userData.password,
            };
                  
            const loginRes = await axios.post(`${BASEURL}auth/v1/login/`, loginData);
      
            if (loginRes.status === 200) {
              const tokens = loginRes.data;
              setAuthToken(tokens);
              localStorage.setItem("authTokens", JSON.stringify(tokens));
              setUserEmail(userData.email); // Set the email on registration
              localStorage.setItem("userEmail", userData.email); // Save email in localStorage
              setIsLoggedIn(true);
              navigate("/");
            }
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            const errData = error.response.data;
            if (errData.email?.[0]?.includes("already exists")) {
              setError("This email is already registered.");
              return;
            }
            if(userData.password.length?.[0] < 8){
                setError('Password must be minimum of 8 characters')
            }
          }
          console.error("Registration error:", error);
          setError("Password must be minimum of 8 characters");
        } finally {
          setLoading(false);
        }
    };
      

    const loginUser = async (credentials) => {
        setLoading(true);
        setError("");
        
        try {
            const response = await axios.post(`${BASEURL}auth/v1/login/`, credentials);
            
            if (response.status === 200) {
                const tokens = response.data;
                setAuthToken(tokens);
                localStorage.setItem('authTokens', JSON.stringify(tokens));
                setUserEmail(credentials.email);  // Set email after successful login
                localStorage.setItem('userEmail', credentials.email); // Save email in localStorage
                setIsLoggedIn(true);
                navigate('/');
            }
        } catch (error) {
            setError(
                error.response?.data?.message || 
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = () => {
        setAuthToken(null);
        setUserEmail(null);  // Clear email
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('userEmail'); // Clear email from localStorage
        setIsLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        if (localStorage.getItem('authTokens')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    

    const contextData = {
        user,
        authToken,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser,
        isLoggedIn,
        userEmail
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

const BASEURL = 'https://mooment-prototype-v1.onrender.com/';

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // Function to fetch user data
    const getUser = async () => {
        if (!token) return;
        try {
            const response = await fetch("http://localhost:5000/api/auth/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error("Error fetching user data");
            setUser(data);
        } catch (error) {
            alert(error.message);
        }
    };

    // Fetch token from localStorage and get user data
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            getUser();
        }
    }, []);

    // Register 
    const register = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data?.error || "Error en el registro");
            
            // Alert for successful registration
            alert("Registration successful!");

            // Store token and update state
            localStorage.setItem("token", data.token);
            setToken(data.token);
            await getUser(); // Fetch user data after setting token
            navigate("/"); // Redirect after registration
        } catch (error) {
            alert(error.message);
        }
    };

    // Login user
    const login = async (emailValue, passwordValue) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailValue, password: passwordValue }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.error || "Error en la autenticación");
            alert("Authentication successful!");
            localStorage.setItem("token", data.token);
            setToken(data.token);
            await getUser(); // Fetch user data after setting token
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    // Logout user
    const logOut = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{ user, token, logOut, login, register }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();
// Custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}





export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ user: null, loading: true });


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            setAuth({ user, loading: false })
        }
        else {
            setAuth({ user: null, loading: false });

        }
    }, [])

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setAuth({ user: userData, loading: false });
    }

    const logout = () => {
        localStorage.removeItem('user');
        setAuth({ user: null, loading: false });
      };
    return (
        <AuthContext.Provider value={{
            auth, login , logout
        }}>
            {!auth.loading && children}
        </AuthContext.Provider>
    )
}

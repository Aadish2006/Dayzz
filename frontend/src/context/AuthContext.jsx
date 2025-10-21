import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [token, setToken] = useState(localStorage.getItem('token'));


useEffect(() => {
if (token) {
// optionally decode token or fetch profile
setUser({});
} else setUser(null);
}, [token]);


const login = (t) => { localStorage.setItem('token', t); setToken(t); };
const logout = () => { localStorage.removeItem('token'); setToken(null); setUser(null); };


return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
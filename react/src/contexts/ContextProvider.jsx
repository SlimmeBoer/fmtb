import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios_client.js";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    loading: true, // Voeg loading toe aan de context
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [loading, setLoading] = useState(true); // State voor loading

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('');
        }, 5000);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    useEffect(() => {
        if (token) {
            axiosClient.get('/user')
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false); // Zet loading op false na het laden
                })
                .catch(() => {
                    setToken(null);
                    setUser(null);
                    setLoading(false); // Zet loading op false zelfs bij een fout
                });
        } else {
            setLoading(false); // Zet loading op false als er geen token is
        }
    }, [token]);

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification,
            loading // Voeg loading toe aan de provider
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email')

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem("jwt-token"); 
        setUser(null); 
        return signOut(auth);
    };


    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }

    const getJwtToken = async (email) => {
    try {
        const res = await axios.post("https://etuitionbd-api.vercel.app/getToken", { email });
        // const res = await axios.post("http://localhost:3000/getToken", { email });
        const token = res.data.token;
        localStorage.setItem("jwt-token", token);
        console.log("Token received:", token);
        return token;
    } catch (err) {
        console.error("Failed to fetch token:", err);
        return null;
    }
    };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (!currentUser) {
            localStorage.removeItem('jwt-token');
        }
        setLoading(false);
        });
    return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
        getJwtToken 
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
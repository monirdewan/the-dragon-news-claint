import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from './../firebase/firebase.config';
export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const updateUserProfile=(name,photo)=>{
      return  updateProfile(auth.currentUser, {
            displayName:name,
            photoURL:photo
        })
    }

    const logOutUser =()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubsCribe = onAuthStateChanged(auth, loggedUser =>{
            console.log("logged in User inside auth state observer",loggedUser)
            setUser(loggedUser)
            setLoading(false)
        })
        return () =>{
            unsubsCribe()
        }
    },[])

   
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        logOutUser,
        updateUserProfile,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
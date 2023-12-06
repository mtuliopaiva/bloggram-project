import {db} from "../firebase/config";

import {
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const[loading, setLoading] = useState(null)

    //clean up
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth();

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName:data.displayName
            });
        return user;

        }
        catch(error){
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = " The password must contain at least 6 characters."
            }
            else if(error.message.includes("email-already")){
                systemErrorMessage = "Email is already registered."
            }
            else{
                systemErrorMessage = "An error occurred, please try again later."
        }
        setError(systemErrorMessage);
    };
    setLoading(false);

    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    const login = async(data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(false);

        try{
            if (!data.email || !data.password) {
                throw new Error("Email and password are required.");
            }
            await signInWithEmailAndPassword(auth, data.email, data.password)
        }catch (error){
            console.error("Firebase Authentication Error:", error);
            let systemErrorMessage;

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'User not found.';
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'Wrong password.';
            } else {
                systemErrorMessage = 'An error occurred, please try again later.';
            }
        setError(systemErrorMessage);
    }
    setLoading(false);

}

    //No memory leak
    useEffect(() => {
        return () => setCancelled(true)
    },[]);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
}

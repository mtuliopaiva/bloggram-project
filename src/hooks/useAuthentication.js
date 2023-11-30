import {db} from "../firebase/config";

import {
    getAuth,
    ceateUserWithEmailAndPassowrd,
    SignInWithEmailAndPassword,
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

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null);
        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName:data.displayName
            });
        setLoading(false);
        return user;

        }
        catch(error){
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = " The password must contain at least 6 characters."
            }
            else if(error.message.includes("email-already")){
                systemErrorMessage = "Email is already registered."
            }
            else{
                systemErrorMessage = "An error occurred, please try again later."
        }
        setLoading(false);
        setError(systemErrorMessage);
    };
    };

    //No memory leak
    useEffect(() => {
        return () => setCancelled(true)
    },[]);

    return {
        auth,
        createUser,
        error,
        loading
    }
}

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"; //for login
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app); //for login
export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null); //store and set current user
    const [loading, setLoading] = useState(true);//store and set loading state
    //google login provider
    const googleProvider = new GoogleAuthProvider
    //calling axiosPublic
    const axiosPublic = useAxiosPublic()

    //sign UP function/ will send through context
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login functionallity
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logOut Functionality
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    //google signin functionality
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //update user perofile
    const updateUserProfile = ({ name, photo }) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    //ki ki information AuthProvider er through te sob jaigai patabo segula
    const userInfo = {
        user,
        googleSignIn,
        loginUser,
        loading,
        createUser,
        setUser,
        logOut,
        updateUserProfile
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            //*********************** 2.Store or remove token from localStoarge ****************
            //jwt token manage
            //This code is responsible for managing the JWT authentication token in local storage. It ensures that the token is stored when the user logs in and removed when they log out.
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo) //server theke call kore token nibe/server e ekta token generate hocce app.post('/jwt') route e
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
             //*****************************get token from server and store to local storage
             //*****************************remove token from local storage
            else {
                localStorage.removeItem('access-token')
            }
            //*****************************remove token from local storage
            console.log('Current User:', currentUser)
            setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProviders;
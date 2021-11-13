import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/Firebase.init";

initializeAuthentication();


const useFirebase = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [isloading, setIsloading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    const signInWithGoogle = () => {
        setIsloading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() =>
                setIsloading(false)
            );
    };

    const logOut = () => {
        signOut(auth)
            .then(() => { })
            .finally(() => setIsloading(false));
    };

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsloading(false);
        });
        return () => unsubscribed;
    }, [auth]);



    const updateUserProfile = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {

        }).catch((error) => {

        });
    }


    const handleEmailRegister = (fullName, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setName(fullName);
                console.log(result.user);
                hanldeUserInfoRegister(result.user.email);
            })
            .catch((error) => {
                const errorMessage = error.message;
            });

        // return createUserWithEmailAndPassword(auth, email, password)

    };



    const handleEmailLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const hanldeUserInfoRegister = (email) => {
        fetch("https://pacific-caverns-05949.herokuapp.com/addUserInfo", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
    };







    return {
        user,
        signInWithGoogle,
        logOut,
        isloading,
        handleEmailRegister,
        handleEmailLogin,
        updateUserProfile,
        name,


    };

}


export default useFirebase;
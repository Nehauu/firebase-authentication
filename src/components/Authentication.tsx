import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/module";

export const useAuth = ({
  setErrorMes,
}: {
  setErrorMes: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const setToken = useStore((state) => state.setToken);
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in as", auth.currentUser?.displayName);
      } else {
        console.log("no account detected");
      }
    });
  };

  const logIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const getToken = await auth.currentUser?.getIdToken();
        if (getToken) {
          setToken(getToken);
        }
        const userToken = getToken;

        if (userToken) {
          navigate("/profile");
        }
        console.log(auth.currentUser?.displayName);
      })
      .catch((error) => {
        console.log("error login user");
        setErrorMes("Please double check credientials");
      });
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(() => {
        console.log("google login successful");
        navigate("/profile");
      })
      .catch((error) => {
        console.log("google login unsuccessful");
      });
  };

  const signUp = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: username });
        console.log("create account successful");
        navigate("/");
      })
      .catch((error) => {
        setErrorMes("account creation failed");
      });
  };

  const googleSignup = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(() => {
        console.log("google signup successful");
        navigate("/");
      })
      .catch((error) => {
        console.log("google signup failed");
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user has been logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log("an error occured");
      });
  };

  return { logIn, googleLogin, signUp, googleSignup, checkUser, logOut };
};

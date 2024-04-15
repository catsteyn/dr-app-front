import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Component for OAuth login with Google and Facebook
const OAuth = () => {
  // Initialize Firebase authentication
  const auth = getAuth(app);
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Navigation function from React Router

  // Function to handle Google login
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider(); // Create Google authentication provider
    provider.setCustomParameters({ prompt: "select_account" }); // Set custom parameters for Google sign-in
    try {
      // Sign in with Google popup window
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // Send Google user data to backend for authentication
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });
      const data = res.data; // Extract user data from response
      // If authentication is successful, dispatch loginSuccess action and navigate to client page
      if (res.status === 200) {
        dispatch(loginSuccess(data));
        navigate("/client");
      }
    } catch (error) {
      console.error(error);
      // Handle errors, e.g., if user exists with a different credential
      if (error.code === "auth/account-exists-with-different-credential") {
        alert("User exists with a different credential");
      }
    }
  };

  // Function to handle Facebook login
  const handleFacebookClick = async () => {
    const provider = new FacebookAuthProvider(); // Create Facebook authentication provider
    try {
      // Sign in with Facebook popup window
      const resultsFromFacebook = await signInWithPopup(auth, provider);
      // Send Facebook user data to backend for authentication
      const res = await axios.post("http://localhost:5000/api/auth/facebook", {
        name: resultsFromFacebook.user.displayName,
        email: resultsFromFacebook.user.email,
        facebookPhotoUrl: resultsFromFacebook.user.photoURL,
      });
      const data = res.data; // Extract user data from response
      // If authentication is successful, dispatch loginSuccess action and navigate to client page
      if (res.status === 200) {
        dispatch(loginSuccess(data));
        navigate("/client");
      }
    } catch (error) {
      console.error(error);
      // Handle errors, e.g., if user exists with a different credential
      if (error.code === "auth/account-exists-with-different-credential") {
        alert("User exists with a different credential");
        window.close(); // Close the Facebook authentication popup window
      }
    }
  };

  // Render OAuth buttons for Google and Facebook login
  return (
    <>
      <Button type="button" onClick={handleGoogleClick}>
        <AiFillGoogleCircle
          style={{
            width: "20px",
            height: "20px",
            marginRight: "8px",
            verticalAlign: "text-bottom",
          }}
        />
        Continue with Google
      </Button>
      <Button type="button" onClick={handleFacebookClick}>
        <AiFillFacebook
          style={{
            width: "18px",
            height: "18px",
            marginRight: "8px",
            verticalAlign: "text-bottom",
          }}
        />
        Continue with Facebook
      </Button>
    </>
  );
};

export default OAuth;

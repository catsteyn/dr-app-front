import React, { useState } from "react";
import axios from "axios";
import OAuth from "./OAuth";

// Component for user login and signup
const LoginPage = () => {
  // State for login and signup form data
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
  });

  // Function to update login form data
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Function to update signup form data
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Function to handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data to backend for authentication
      const response = await axios.post(
        "https://still-ridge-22676-02c6e375dc3c.herokuapp.com/api/auth/login",
        loginData
      );
      const { password } = loginData;
      console.log(response.data); // Log response data for success
      // Redirect user based on username and password
      if (password === "drjones") {
        // Redirect to admin page
        window.location.href = "/admin";
      } else {
        // Redirect to client page
        window.location.href = "/client";
      }
    } catch (error) {
      console.error("Error:", error); // Log error message for failure
      // Handle error
    }
  };

  // Function to handle signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup data to backend for registration
      const response = await axios.post(
        "https://still-ridge-22676-02c6e375dc3c.herokuapp.com/api/auth/signup",
        signupData
      );
      console.log(response.data); // Log response data for success
      alert("Thank you for signing up! Please log in."); // Show alert for successful signup
    } catch (error) {
      console.error("Error:", error); // Log error message for failure
      if (
        error.response &&
        error.response.data.message === "User already exists"
      ) {
        alert(
          "A user with this email already exists. Please use a different email."
        ); // Show alert for existing user
      }
    }
  };

  // Render login and signup forms with OAuth login buttons
  return (
    <div className="container">
      <form id="loginForm" className="form" onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email/Username"
          name="identifier"
          value={loginData.identifier}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
        />
        <button type="submit">Login</button>
        <p>- or -</p>
        <OAuth />
      </form>

      <form id="signupForm" className="form" onSubmit={handleSignupSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={signupData.email}
          onChange={handleSignupChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signupData.password}
          onChange={handleSignupChange}
        />
        <button type="submit">Signup</button>
        <p>- or -</p>
        <OAuth />
      </form>
    </div>
  );
};

export default LoginPage;

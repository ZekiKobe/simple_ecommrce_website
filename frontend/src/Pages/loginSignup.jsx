import React, { useState } from "react";
import "./CSS/loginSignup.css";

function LoginSignup() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [message, setMessage] = useState(null);

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token); // Store token in local storage
        window.location.replace("/"); // Redirect to home page
      } else {
        setMessage(responseData.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login. Please try again later.");
    }
  };

  const signup = async () => {
    // Check password strength before signing up
    const passwordStrength = getPasswordStrength(formData.password);

    if (passwordStrength === 0) {
      setMessage(
        "Password is weak. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return; // Exit the function without signing up
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        setMessage(responseData.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred during signup. Please try again later.");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let passwordMessage = "";

    // Check if the changed field is the password field
    if (name === "password") {
      // Check password strength
      const passwordStrength = getPasswordStrength(value);

      // Set password strength message
      if (passwordStrength === 0) {
        passwordMessage =
          "Password is weak. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
      } else if (passwordStrength === 1) {
        passwordMessage = "Password strength: Medium";
      } else if (passwordStrength === 2) {
        passwordMessage = "Password strength: Strong";
      }

      setMessage(passwordMessage);
    }

    setFormData({ ...formData, [name]: value });
  };

  const getPasswordStrength = (password) => {
    // Regular expressions to check for presence of uppercase, lowercase, numbers, and special characters
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check for presence of required characters
    let strength = 0;
    if (
      password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharacterRegex.test(password)
    ) {
      strength = 2; // Strong
    } else if (
      password.length >= 8 &&
      (uppercaseRegex.test(password) ||
        lowercaseRegex.test(password) ||
        numberRegex.test(password) ||
        specialCharacterRegex.test(password))
    ) {
      strength = 1; // Medium
    }

    return strength; // Weak if strength remains 0
  };

  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={changeHandler}
              placeholder="Full Name here"
            />
          ) : (
            <></>
          )}
          {state === "Sign Up" ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Username"
            />
          ) : (
            <></>
          )}
          {state === "Sign Up" ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={changeHandler}
              placeholder="Phone number here eg. 0912657346"
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Your password"
            required
          />
          {state === "Sign Up" ? (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm your password here"
            />
          ) : (
            <></>
          )}
        </div>
        {message && (
          <p
            style={{
              color: message.includes("weak") ? "red" : "#07f747",
              marginTop: "20px",
              fontSize: "18px",
            }}
            className="message"
          >
            {message}
          </p>
        )}
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              {" "}
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              {" "}
              Signup here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the terms and privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;

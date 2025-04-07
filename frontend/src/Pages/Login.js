import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');




    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { usernameOrEmail, password };

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");


                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Unexpected response: ${text}`);
                }

                const errorData = await response.json();
                throw new Error(errorData.error || "An unexpected error occurred.");
            }

            const data = await response.json();
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);
            localStorage.setItem("email", data.email);
            localStorage.setItem("isLoggedIn", "true");

            navigate("/dashboard");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage(error.message || "An unexpected error occurred. Please try again later.");
        }
    };


    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const email = prompt("Please enter your email address:");
        if (!email) return;

        try {
            const response = await fetch("http://localhost:8080/api/auth/forgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                alert(`Failed to send reset link: ${errorMessage}`);
                return;
            }

            alert("If an account with that email exists, we've sent a password reset link.");
        } catch (error) {
            console.error("Error during forgot password:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="container">
            <div className="LoginBox">

                {/* <div className="headerBox">
                    <h1 className="title">DATA VISION</h1>
                    <p className="subtitle">Login to access the dashboard</p>
                </div> */}
                {/* Left Section */}
                <div className="leftBox">
                    <h1 className="HEAD1">WELCOME</h1>
                    <h1 className="HEAD2">DATAVISION</h1>
                    <p>@NIT CALICUT 2025</p>


                </div>
                {/* Right Section */}
                <div className="rightBox">
                    <div className="headerBox">
                        <h2>Login</h2>
                        <p>Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="form">
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <div className="formGroup">
                            <label htmlFor="usernameOrEmail" className="label">Username</label>
                            <input
                                type="text"
                                id="usernameOrEmail"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password" className="label">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                            />
                        </div>
                        <button type="submit" className="button">Login</button>
                    </form>
                    <div className="footerLinks">
                        <a href="#" className="link" onClick={handleForgotPassword}>Forgot Password?</a>
                        <span className="linkSeparator">|</span>
                        {/* Use Link for navigation */}
                        <Link to="/Registration" className="link">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
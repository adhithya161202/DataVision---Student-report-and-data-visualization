import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Registration.css";

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
    
        const payload = {
            firstName,
            lastName,
            email,
            username,
            password,
            termsAgreed,
        };
    
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text(); // Read error message from backend
                alert(`Registration failed: ${errorMessage}`);
                return;
            }
    
            const successMessage = await response.text();
            alert(successMessage); // Show success message
    
            // Redirect to login page
            window.location.href = "/login";
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };
    
    return (
        <div className="container">
            <div className="formContainer">
                <div className="titleBox">
                    <h2 className="title">Create a new account</h2>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <div className="nameContainer">
                        <div className="formGroup">
                            <label htmlFor="firstName" className="label">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input"
                             />   
                        </div>
                        <div className="formGroup">
                            <label htmlFor="lastName" className="label">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div  className="nameContainer">
                    <div className="formGroup">
                        <label htmlFor="username" className="label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                    </div>
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
                        <small className="passwordNote">
                            Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
                        </small>
                    </div>

                    <div className="formGroup">
                        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div className="termsContainer">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            checked={termsAgreed}
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                            className="checkbox"
                        />
                        <label className="termsLabel">
                            I agree to the<a href="#"className="link">Terms of Service</a>and<a href="#"className="link">Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className="button">
                        Create Account
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Registration;

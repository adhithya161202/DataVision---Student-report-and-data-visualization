// import React, { useState } from "react";
// import "./Login.css";

// function Login() {
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const payload = { usernameOrEmail, password };

//         try {
//             const response = await fetch("http://localhost:8080/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 alert(`Login failed: ${errorMessage}`);
//                 return;
//             }

//             alert("Login successful!");
//             localStorage.setItem("isLoggedIn", true);

//             window.location.href = "/dashboard";
//         } catch (error) {
//             console.error("Error during login:", error);
//             alert("An unexpected error occurred. Please try again later.");
//         }
//     };

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
        
//         const email = prompt("Please enter your email address:");
//         if (!email) return;

//         try {
//             const response = await fetch("http://localhost:8080/api/auth/forgotpassword", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email }),
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.text();
//                 alert(`Failed to send reset link: ${errorMessage}`);
//                 return;
//             }

//             alert("If an account with that email exists, we've sent a password reset link.");
//         } catch (error) {
//             console.error("Error during forgot password:", error);
//             alert("An unexpected error occurred. Please try again later.");
//         }
//     };

//     return (
//         <div className="container">
//             <div className="LoginBox">
//                 <div className="headerBox">
//                     <h1 className="title">DATA VISION</h1>
//                     <p className="subtitle">Login to access the dashboard</p>
//                 </div>
//                 <form onSubmit={handleSubmit} className="form">
//                     <div className="formGroup">
//                         <label htmlFor="usernameOrEmail" className="label">Username or Email</label>
//                         <input
//                             type="text"
//                             id="usernameOrEmail"
//                             value={usernameOrEmail}
//                             onChange={(e) => setUsernameOrEmail(e.target.value)}
//                             className="input"
//                         />
//                     </div>
//                     <div className="formGroup">
//                         <label htmlFor="password" className="label">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="input"
//                         />
//                     </div>
//                     <button type="submit" className="button">Login</button>
//                 </form>
//                 <div className="footerLinks">
//                     <a href="#" className="link" onClick={handleForgotPassword}>Forgot Password?</a>
//                     <span className="linkSeparator">|</span>
//                     <a href="/register" className="link">Create Account</a>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Login;



import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Login.css";

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

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
                const errorMessage = await response.text();
                alert(`Login failed: ${errorMessage}`);
                return;
            }

            alert("Login successful!");
            localStorage.setItem("isLoggedIn", true);

            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Error during login:", error);
            alert("An unexpected error occurred. Please try again later.");
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
                <div className="headerBox">
                    <h1 className="title">DATA VISION</h1>
                    <p className="subtitle">Login to access the dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className="form">
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
    );
}

export default Login;


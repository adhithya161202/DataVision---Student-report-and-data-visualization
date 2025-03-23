// import React, { useState } from 'react';

// function Registration() {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [termsAgreed, setTermsAgreed] = useState(false);
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (password !== confirmPassword) {
//             setMessage("Passwords do not match!");
//             return;
//         }

//         const userData = {
//     name: ${firstName} ${lastName},  // Add full name
//     firstName,
//     lastName,
//     email,
//     username,
//     password
// };


//         try {
//             const response = await fetch('http://localhost:8080/api/students', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             if (response.ok) {
//                 setMessage('Registration successful!');
//                 setFirstName('');
//                 setLastName('');
//                 setEmail('');
//                 setUsername('');
//                 setPassword('');
//                 setConfirmPassword('');
//                 setTermsAgreed(false);
//             } else {
//                 const errorData = await response.json();
//                 setMessage(errorData.message || 'Registration failed!');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Registration failed! Please try again later.');
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.formContainer}>
//                 <h2 style={styles.title}>Create a new account</h2>
//                 {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <div style={styles.nameContainer}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="firstName">First Name</label>
//                             <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="lastName">Last Name</label>
//                             <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
//                         </div>
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="email">Email Address</label>
//                         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="username">Username</label>
//                         <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="confirmPassword">Confirm Password</label>
//                         <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     </div>
//                     <button type="submit" style={styles.button}>Create Account</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f0f2f5',
//     },
//     formContainer: {
//         width: '80%',
//         maxWidth: '500px',
//         padding: '30px',
//         backgroundColor: '#fff',
//         borderRadius: '8px',
//         boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
//     },
//     title: {
//         fontSize: '24px',
//         textAlign: 'center',
//         marginBottom: '20px',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px',
//     },
//     formGroup: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '10px',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };

// export default Registration;
// import React, { useState } from 'react';

// function Registration() {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [termsAgreed, setTermsAgreed] = useState(false);
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (password !== confirmPassword) {
//             setMessage("Passwords do not match!");
//             return;
//         }

//         const userData = {
//     name: ${firstName} ${lastName},  // Add full name
//     firstName,
//     lastName,
//     email,
//     username,
//     password
// };


//         try {
//             const response = await fetch('http://localhost:8080/api/students', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             if (response.ok) {
//                 setMessage('Registration successful!');
//                 setFirstName('');
//                 setLastName('');
//                 setEmail('');
//                 setUsername('');
//                 setPassword('');
//                 setConfirmPassword('');
//                 setTermsAgreed(false);
//             } else {
//                 const errorData = await response.json();
//                 setMessage(errorData.message || 'Registration failed!');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setMessage('Registration failed! Please try again later.');
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.formContainer}>
//                 <h2 style={styles.title}>Create a new account</h2>
//                 {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
//                 <form onSubmit={handleSubmit} style={styles.form}>
//                     <div style={styles.nameContainer}>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="firstName">First Name</label>
//                             <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <label htmlFor="lastName">Last Name</label>
//                             <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
//                         </div>
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="email">Email Address</label>
//                         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="username">Username</label>
//                         <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div style={styles.formGroup}>
//                         <label htmlFor="confirmPassword">Confirm Password</label>
//                         <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     </div>
//                     <button type="submit" style={styles.button}>Create Account</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// const styles = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f0f2f5',
//     },
//     formContainer: {
//         width: '80%',
//         maxWidth: '500px',
//         padding: '30px',
//         backgroundColor: '#fff',
//         borderRadius: '8px',
//         boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
//     },
//     title: {
//         fontSize: '24px',
//         textAlign: 'center',
//         marginBottom: '20px',
//     },
//     form: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '15px',
//     },
//     formGroup: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         color: '#fff',
//         padding: '10px',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };

// export default Registration;
import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import './Dashboard.css';
import './ContactPage.css';
import logo from '../assets/NIT_logo.png';


const Contact = () => {

    const [userInitials, setUserInitials] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const firstName = localStorage.getItem("firstName") || "";
        const lastName = localStorage.getItem("lastName") || "";
        setUserInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase());
        setUserName(`${firstName} ${lastName}`);
    }, []);

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-header-h2">DATA VISION</h2>
                </div>
                <div className="sidebar-menu">
                    <ul className="sidebar-menu-ul">
                        <li className="sidebar-menu-li">
                            <Link to="/dashboard" className="sidebar-analytics-link">
                                <i className="fas fa-tachometer-alt main-icons"></i>Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-analytics">
                    <p className="sidebar-analytics-p">ANALYTICS</p>
                    <ul className="sidebar-analytics-ul">
                        <li className="sidebar-analytics-li">
                            <Link to="/Placement" className="sidebar-analytics-link">
                                <i className="fas fa-chart-bar main-icons"></i>Placement
                            </Link>
                        </li>
                        <li className="sidebar-analytics-li">
                            <Link to="/Events" className="sidebar-analytics-link">
                                <i className="fas fa-calendar-alt main-icons"></i>Events
                            </Link>
                        </li>
                        <li className="sidebar-analytics-li">
                            <Link to="/publications" className="sidebar-analytics-link">
                                <i className="fas fa-newspaper main-icons"></i>Publications
                            </Link>
                        </li>
                        <li className="sidebar-analytics-li">
                            <Link to="/societies" className="sidebar-analytics-link">
                                <i className="fas fa-users main-icons"></i>Societies
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-settings">
                    <p className="sidebar-settings-p">SETTINGS</p>
                    <ul className="sidebar-settings-ul">
                        <li className="sidebar-settings-li">
                            <Link to="/preferences" className="sidebar-settings-link">
                                <i className="fas fa-cog main-icons"></i>Account
                            </Link>
                        </li>
                        <li className="sidebar-settings-li">
                            <Link to="/Contact" className="sidebar-settings-link sidebar-menu-link-active ">
                                <i className="fas fa-question-circle main-icons "></i>Contact
                            </Link>
                        </li>
                        <li className="sidebar-settings-li">
                            <Link to="/Login" className="sidebar-settings-link ">
                                <i className="fas fa-sign-out-alt main-icons"></i>Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-header-h1">Contact Information</h1>
                    <div className="admin-header-info">
                        <span className="admin-name">{userName}</span>
                        <Link to="/account" className="profile-pic-link">
                            <div className="profile-pic-header">{userInitials}</div>
                        </Link>
                    </div>
                </header>

                {/* Contact Information Section */}
                <div className="contact-container">
                    {/* First Data Card with Logo */}
                    <div className="card card-with-logo">
                        <div className="logo-container">
                            <img src={logo} alt="Logo" className="contact-logo" />
                            <p className="institute-name">National Institute of Technology Calicut</p>
                        </div>
                        <div className="info">
                            <div className="info-item">
                                <span className="icon">📞</span>
                                <div>
                                    <strong>Phone</strong>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon">📧</span>
                                <div>
                                    <strong>Email</strong>
                                    <p>contact@datavision.edu</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon">📍</span>
                                <div>
                                    <strong>Address</strong>
                                    <p>National Institute of Technology Calicut,
                                        P.O 673 601,
                                        Kozhikode, India.</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="icon">🌐</span>
                                <div>
                                    <strong>Website</strong>
                                    <p>https://nitc.ac.in/</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="card">
                        <h2>Department Contacts</h2>
                        <div className="department">
                            <p><strong>Academic Department</strong><br />academic@datavision.edu<br />+1 (555) 123-4567 ext. 101</p>
                            <p><strong>Administrative Department</strong><br />admin@datavision.edu<br />+1 (555) 123-4567 ext. 102</p>
                            <p><strong>Technical Support</strong><br />support@datavision.edu<br />+1 (555) 123-4567 ext. 103</p>
                            <p><strong>Placement Cell</strong><br />placement@datavision.edu<br />+1 (555) 123-4567 ext. 104</p>
                        </div>
                    </div>

                    <div className="card">
                        <h2>Connect With Us</h2>
                        <div className="social-links">
                            <p><strong>Facebook:</strong> https://www.facebook.com/NIT.Calicut.Kerala/</p>
                            <p><strong>LinkedIn:</strong>https://www.linkedin.com/school/national-institute-of-technology-calicut/</p>
                            <p><strong>Twitter:</strong> https://x.com/nitcofficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

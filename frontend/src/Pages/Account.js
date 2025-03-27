import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Account.css';
import './Dashboard.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    initials: 'AD' // Default initials
  });
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || '';
    
    setUserData({
      firstName,
      lastName,
      email,
      initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-header-h2">DATA VISION</h2>
          <div className="profile-section">
          {/* <div className="profile-pic">{userData.initials}</div> */}
            {/* <div className="admin-info">
              <p className="admin-info-p">{`${userData.firstName} ${userData.lastName}`}</p>
              <p className="admin-info-p">System Administrator</p>
            </div> */}
          </div>
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
              <Link to="/Account" className="sidebar-settings-link sidebar-menu-link-active">
                <i className="fas fa-cog main-icons"></i>Account
              </Link>
            </li>
            <li className="sidebar-settings-li">
              <Link to="/Contact" className="sidebar-settings-link">
                <i className="fas fa-question-circle main-icons"></i>Contact
              </Link>
            </li>
            <li className="sidebar-settings-li">
              <Link to="/Login" className="sidebar-settings-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt main-icons"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="Account-header">
          <h1>Account Details</h1>
          <div className="admin-header-info">
            <span className="admin-name">{`${userData.firstName} ${userData.lastName}`}</span>
            <div className="profile-pic-header">{userData.initials}</div>
          </div>
        </header>

        {/* Tabs */}
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'account' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            Account Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'account' && (
          <div className="section">
            <div className="info-field">
              <label className="label">First Name</label>
              <p className="info-text">{userData.firstName}</p>
            </div>

            <div className="info-field">
              <label className="label">Last Name</label>
              <p className="info-text">{userData.lastName}</p>
            </div>

            <div className="info-field">
              <label className="label">Email Address</label>
              <p className="info-text">{userData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

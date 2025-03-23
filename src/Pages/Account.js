import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import './Dashboard.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('account');

  const user = {
    name: 'Admin User',
    email: 'admin@example.edu',
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-header-h2">DATA VISION</h2>
          <div className="profile-section">
            {/* <div style={styles.profilePic}>AD</div> */}
          </div>
        </div>
        {/* <p className="sidebar-header-p">Admin Dashboard</p> */}
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
              <Link to="/Placement" className="sidebar-analytics-link  ">
                <i className="fas fa-chart-bar main-icons"></i>Placement
              </Link>
            </li>
            <li className="sidebar-analytics-li">
              <Link to="/Events" className="sidebar-analytics-link ">
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
              <Link to="/Login" className="sidebar-settings-link">
                <i className="fas fa-question-circle main-icons"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="sidebar-admin">
              
                                  <div className="admin-icon">AD</div>
                                  <div className="admin-info">
                                      <p className="admin-info-p">Admin User</p>
                                      <p className="admin-info-p:last-child">System Administrator</p>
                                  </div>
              
                              </div> */}

      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="Account-header">
          <h1>Account Details</h1>
          {/* <div className="admin-header-info">
            <span className="admin-name">Admin User</span>
            <div className="profile-pic-header">AD</div>
          </div> */}
        </header>

        {/* Tabs */}
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'account' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            Account Settings
          </button>
          {/* <button
            className={`tab-button ${activeTab === 'display' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('display')}
          >
            Display Settings
          </button>
          <button
            className={`tab-button ${activeTab === 'notifications' ? 'active-tab' : ''}`}
            onClick={() => handleTabClick('notifications')}
          >
            Notifications
          </button> */}
        </div>

        {/* Tab Content */}
        {activeTab === 'account' && (
          <div className="section">
            {/* Admin Header Info */}
            <div className="admin-header-info"></div>

            {/* Display Name */}
            <div className="info-field">
              <label className="label">User Name</label>
              <p className="info-text">{user.name}</p>
            </div>

            {/* Email Address */}
            <div className="info-field">
              <label className="label">Email Address</label>
              <p className="info-text">{user.email}</p>
            </div>
          </div>
        )}

        {/* {activeTab === 'display' && (
          <div className="section">
            <h2 className="section-title">Display Settings</h2>
            <p>Theme options here</p>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="section">
            <h2 className="section-title">Notification Settings</h2>
            <p>Notification options here</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Account;

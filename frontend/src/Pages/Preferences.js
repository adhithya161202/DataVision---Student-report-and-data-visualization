import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Preferences = () => {
  const styles = {
    PreferencesContainer: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f4f7fa',
      color: '#333',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#2c3e50',
      color: '#fff',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarHeader: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sidebarHeaderH2: {
      margin: '0',
      fontWeight: 'bold',
      fontSize: '20px',
    },
    sidebarHeaderP: {
      margin: '5px 0',
      fontSize: '14px',
      color: '#bdc3c7',
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
    },
    profilePic: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#3498db',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      marginRight: '10px',
      cursor: 'pointer',
    },
    sidebarMenuUl: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    sidebarMenuLi: {
      marginBottom: '10px',
    },
    sidebarMenuA: {
      display: 'block',
      color: '#fff',
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      fontSize: '16px',
    },
    sidebarAnalyticsP: {
      color: '#bdc3c7',
      marginTop: '20px',
      marginBottom: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      paddingLeft: '15px',
    },
    sidebarAnalyticsUl: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    sidebarAnalyticsLi: {
      marginBottom: '10px',
    },
    sidebarAnalyticsA: {
      display: 'block',
      color: '#fff',
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      fontSize: '16px',
    },
    sidebarSettingsP: {
      color: '#bdc3c7',
      marginTop: '20px',
      marginBottom: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
      paddingLeft: '15px',
    },
    sidebarSettingsUl: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    sidebarSettingsLi: {
      marginBottom: '10px',
    },
    sidebarSettingsA: {
      display: 'block',
      color: '#fff',
      textDecoration: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      fontSize: '16px',
    },
    sidebarAdmin: {
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '5px',
    },
    adminIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#3498db',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      marginRight: '10px',
    },
    adminInfoP: {
      margin: '0',
      fontSize: '14px',
    },
    adminInfoPLastChild: {
      color: '#bdc3c7',
    },
    mainContent: {
      flex: '1',
      padding: '20px',
    },
    PreferencesHeader: {
      marginBottom: '20px',
      borderBottom: '2px solid #ddd',
      paddingBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    PreferencesHeaderH1: {
      margin: '0',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#34495e',
    },
    quickStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '20px',
    },
    statCard: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    statCardH3: {
      margin: '0',
      fontSize: '18px',
      color: '#34495e',
    },
    statCardP: {
      margin: '5px 0',
      fontSize: '16px',
      color: '#7f8c8d',
    },
    statCardPLastChild: {
      fontSize: '14px',
    },
    filters: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      alignItems: 'center',
    },
    filtersLabel: {
      fontSize: '16px',
      color: '#34495e',
    },
    filtersSelect: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      color: '#34495e',
    },
    filtersButton: {
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    dataCardH3: {
      margin: '0',
      fontSize: '20px',
      color: '#34495e',
      marginBottom: '10px',
    },
    chartPlaceholder: {
      height: '200px',
      backgroundColor: '#ecf0f1',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#7f8c8d',
      fontSize: '18px',
      fontStyle: 'italic',
    },
    sidebarMenuActive: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    footerIcons: {
      display: 'flex',
      marginLeft: '10px',
    },
    mainIcons: {
      marginRight: '10px',
    },


    filtersContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    filterLabel: {
      fontSize: '16px',
      color: '#34495e',
    },
    filterSelect: {
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      color: '#34495e',
      minWidth: '120px',
    },
    applyFiltersButton: {
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 12px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    adminHeaderInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    adminName: {
      marginRight: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#34495e',
    },
    profilePicHeader: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#3498db',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      cursor: 'pointer',
    },
    tabContainer: {
      display: 'flex',
      borderBottom: '2px solid #ddd',
      marginBottom: '20px',
    },
    tabButton: {
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '16px',
      cursor: 'pointer',
      color: '#34495e',
      borderBottom: '2px solid transparent',
      transition: 'border-bottom 0.3s, color 0.3s',


      '&:hover': {
        color: '#2c3e50',
      },
    },
    activeTab: {
      borderBottom: '2px solid #3498db',
      color: '#3498db',
    },
    section: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '20px',
      color: '#34495e',
      marginBottom: '15px',
      textAlign: 'left',
    },
    formField: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: '16px',
      color: '#34495e',
      marginBottom: '5px',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      color: '#34495e',
      textAlign: 'left',
    },
    accountDetailsText: {
      textAlign: 'left',
      fontSize: '16px',
      color: '#7f8c8d',
      marginBottom: '10px',
    },
  },
    user = {
      name: 'Admin User',
      email: 'admin@example.edu',
    };


  const [activeTab, setActiveTab] = useState('account');


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div style={styles.PreferencesContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarHeaderH2}>Student Analytics</h2>
          <div style={styles.profileSection}>
            {/* <div style={styles.profilePic}>AD</div> */}
          </div>
        </div>

        <div style={styles.sidebarMenu}>
          <ul style={styles.sidebarMenuUl}>
            <li style={styles.sidebarMenuLi}>
              <Link to="/dashboard" style={{ ...styles.sidebarMenuA }}>
                <i className="fas fa-tachometer-alt" style={styles.mainIcons}></i>Dashboard
              </Link>
            </li>
            <li style={styles.sidebarMenuLi}>
              <Link to="/students" style={styles.sidebarMenuA}>
                <i className="fas fa-user-graduate" style={styles.mainIcons}></i>Students
              </Link>
            </li>
            <li style={styles.sidebarMenuLi}>
              <Link to="/departments" style={styles.sidebarMenuA}>
                <i className="fas fa-building" style={styles.mainIcons}></i>Departments
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.sidebarAnalytics}>
          <p style={styles.sidebarAnalyticsP}>ANALYTICS</p>
          <ul style={styles.sidebarAnalyticsUl}>
            <li style={styles.sidebarAnalyticsLi}>
              <Link to="/placement" style={{ ...styles.sidebarAnalyticsA }}>
                <i className="fas fa-chart-bar" style={styles.mainIcons}></i> Placement
              </Link>
            </li>

            <li style={styles.sidebarAnalyticsLi}>
              <Link to="/Events" style={styles.sidebarAnalyticsA}>
                <i className="fas fa-calendar-alt" style={styles.mainIcons}></i>Events
              </Link>
            </li>
            <li style={styles.sidebarAnalyticsLi}>
              <Link to="/publications" style={styles.sidebarAnalyticsA}>
                <i className="fas fa-newspaper" style={styles.mainIcons}></i>Publications
              </Link>
            </li>
            <li style={styles.sidebarAnalyticsLi}>
              <Link to="/societies" style={styles.sidebarAnalyticsA}>
                <i className="fas fa-users" style={styles.mainIcons}></i>Societies
              </Link>
            </li>
          </ul>
        </div>
        <div style={styles.sidebarSettings}>
          <p style={styles.sidebarSettingsP}>SETTINGS</p>
          <ul style={styles.sidebarSettingsUl}>
            <li style={styles.sidebarSettingsLi}>
              <Link to="/placement" style={{ ...styles.sidebarAnalyticsA, ...styles.sidebarMenuActive }}>
                <i className="fas fa-cog" style={styles.mainIcons}></i>Preferences
              </Link>
            </li>
            <li style={styles.sidebarSettingsLi}>
              <Link to="/help" style={styles.sidebarSettingsA}>
                <i className="fas fa-question-circle" style={styles.mainIcons}></i>Help
              </Link>
            </li>
          </ul>
        </div>
        {/* <div style={styles.sidebarAdmin}>

                    <div style={styles.adminIcon}>AD</div>
                    <div style={styles.adminInfo}>
                        <p style={styles.adminInfoP}>Admin User</p>
                        <p style={styles.adminInfoPLastChild}>System Administrator</p>
                    </div>

                </div> */}

      </div>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <header style={styles.PreferencesHeader}>
          <h1 style={styles.PreferencesHeaderH1}>User Preferences</h1>
          <div style={styles.adminHeaderInfo}>
            <span style={styles.adminName}>Admin User</span>
            <div style={styles.profilePicHeader}>AD</div>
          </div>
        </header>


        {/* Quick Stats */}


        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === 'account' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('account')}
          >
            Account Settings
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === 'display' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('display')}
          >
            Display Settings
          </button>
          <button
            style={{
              ...styles.tabButton,
              ...(activeTab === 'notifications' ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>


        {activeTab === 'account' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Profile Information</h2>
            <div style={styles.formField}>
              <label style={styles.label}>Account Details</label>
              <div style={styles.accountDetailsText}>Your basic account information</div>
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Display Name</label>
              <input
                type="text"
                style={styles.input}
                defaultValue={user.name}
              />
            </div>
            <div style={styles.formField}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                style={styles.input}
                defaultValue={user.email}
              />
            </div>
          </div>
        )}


        {activeTab === 'display' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Display Settings</h2>
            <div style={styles.formField}>
              <label style={styles.label}>Theme</label>
              <div>Theme options here</div>
            </div>
          </div>
        )}


        {activeTab === 'notifications' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Notification Settings</h2>
            <div style={styles.formField}>
              <label style={styles.label}>Email Notifications</label>
              <div>Notification options here</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Preferences;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventParticipationChart from '../components/Bar1.js';
import './Dashboard.css';
import axios from 'axios';
import { usePDF } from 'react-to-pdf';


const Events = () => {
    const [eventsData, setEventsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [startYear, setStartYear] = useState("all");
    const [endYear, setEndYear] = useState("all");
    const { toPDF, targetRef } = usePDF({ filename: 'publications.pdf' });
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [userInitials, setUserInitials] = useState("");
    const [userName, setUserName] = useState("");





    useEffect(() => {
        axios.get("http://localhost:8080/api/events")
            .then(response => {
                setEventsData(response.data);
                setFilteredData(response.data); // Initialize filtered data with all events
            })
            .catch(error => console.error("Error fetching events data:", error));
    }, []);

    useEffect(() => {
        const firstName = localStorage.getItem("firstName") || "";
        const lastName = localStorage.getItem("lastName") || "";
        setUserInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase());
        setUserName(`${firstName} ${lastName}`);
    }, []);



   
    const applyFilters = () => {
        let filtered = eventsData;

        if (selectedDepartment !== 'all') {
            filtered = filtered.filter(event => event.department === selectedDepartment);
        }

        if (startYear !== 'all' && endYear !== 'all') {
            filtered = filtered.filter(event => event.year >= parseInt(startYear) && event.year <= parseInt(endYear));
        }

        console.log("Filtered Data:", filtered); // Debugging output
        setFilteredData(filtered);
    };

    const fetchTableData = () => {
        axios.get('http://localhost:8080/api/events/all')
            .then(response => {
                setTableData(response.data); // Store fetched data in state
                setShowTable(true); // Show the table
            })
            .catch(error => console.error("Error fetching table data:", error));
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
                            <Link to="/Events" className="sidebar-analytics-link sidebar-menu-link-active">
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
                            <Link to="/Contact" className="sidebar-settings-link">
                                <i className="fas fa-question-circle main-icons"></i>Contact
                            </Link>
                        </li>

                        <li className="sidebar-settings-li">
                            <Link to="/Contact" className="sidebar-settings-link">
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
                <header className="dashboard-header">
                    <h1 className="dashboard-header-h1">Event Details</h1>
                    <div className="admin-header-info">
                        <span className="admin-name">{userName}</span>
                        <Link to="/account" className="profile-pic-link">
                            <div className="profile-pic-header">{userInitials}</div>
                        </Link>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Total Students</h3>
                        <p className="stat-card-p">40</p>
                        <p className="stat-card-p:last-child">All departments</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Placement Rate</h3>
                        <p className="stat-card-p">87.5%</p>
                        <p className="stat-card-p:last-child">2024-2025 batch</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Events Participation</h3>
                        <p className="stat-card-p">78%</p>
                        <p className="stat-card-p:last-child">Co-curricular</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Publications</h3>
                        <p className="stat-card-p">35</p>
                        <p className="stat-card-p:last-child">Last year</p>
                    </div>
                </div>
                {/* Filters */}
                <div className="filters-container">
                    <label htmlFor="departmentFilter" className="filter-label">Department:</label>
                    <select id="departmentFilter" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} className="filter-select">
                        <option value="all">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Civil">Civil</option>
                    </select>
                    <label htmlFor="startYearFilter" className="filter-label">Start Year:</label>
                    <select id="startYearFilter" className="filter-select" value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                        <option value="all">All Years</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                    <label htmlFor="endYearFilter" className="filter-label">End Year:</label>
                    <select id="endYearFilter" className="filter-select" value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                        <option value="all">All Years</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                    <button className="apply-filters-button" onClick={applyFilters}>Apply Filters</button>
                    <button className="apply-filters-button" onClick={() => toPDF()}>Export as PDF</button>
                    <button className="apply-filters-button" onClick={() => {
                        fetchTableData();
                        setShowTable(!showTable);
                    }}>
                        {showTable ? "Hide Table" : "View Table"}
                    </button>

                </div>


                {/* Data Visualizations */}
                {/* <div className="data-visualizations">
                    {filteredData.length > 0 ? (
                        <>
                            
                            <div ref={targetRef}>
                                <EventParticipationChart data={filteredData} />
                            </div>

                        </>
                    ) : (
                        "No data available for the selected filters."
                    )}




                    {showTable && (
                        <div className="table-container">
                            <h3>Event Participation Data</h3>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Student Name</th>
                                        <th>Event Name</th>
                                        <th>Year</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.length > 0 ? (
                                        tableData.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.id || 'N/A'}</td>
                                                <td>{row.studentName || 'N/A'}</td>
                                                <td>{row.eventName || 'N/A'}</td>
                                                <td>{row.year || 'N/A'}</td>
                                                <td>{row.department || 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="no-data-message">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}




                </div> */}



                {/* Data Visualizations */}
                <div className="data-visualizations">
                    {filteredData.length > 0 ? (
                        <div ref={targetRef}>
                            <EventParticipationChart data={filteredData} />
                        </div>
                    ) : (
                        "No data available for the selected filters."
                    )}
                </div>

                {/* Table (rendered below the chart when showTable is true) */}
                {showTable && (
                    <div className="table-container">
                        <h3>Event Participation Data</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Event Name</th>
                                    <th>Year</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id || 'N/A'}</td>
                                            <td>{row.studentName || 'N/A'}</td>
                                            <td>{row.eventName || 'N/A'}</td>
                                            <td>{row.year || 'N/A'}</td>
                                            <td>{row.department || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="no-data-message">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};





export default Events;

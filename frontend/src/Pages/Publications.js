
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import PublicationsTrendChart from '../components/Line3.js';
import './Dashboard.css';
import PublicationService from '../services/PublicationService';
import { usePDF } from 'react-to-pdf';





const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [filteredPublications, setFilteredPublications] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const { toPDF, targetRef } = usePDF({ filename: 'publications.pdf' });
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [userInitials, setUserInitials] = useState("");
    const [userName, setUserName] = useState("");




    useEffect(() => {
        const firstName = localStorage.getItem("firstName") || "";
        const lastName = localStorage.getItem("lastName") || "";
        setUserInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase());
        setUserName(`${firstName} ${lastName}`);
    }, []);


    useEffect(() => {
        setLoading(true);
        PublicationService.getAllPublications()
            .then(response => {
                console.log("API Response:", response.data);
                setPublications(response.data);
                setFilteredPublications(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching publications:', error);
                setError('Failed to fetch publications data');
                setLoading(false);
            });
    }, []);

    // useEffect(() => {
    //     applyFilters();
    // }, [selectedDepartment]);

    const applyFilters = () => {
        let filteredData = publications;

        if (selectedDepartment !== "All Departments") {
            filteredData = filteredData.filter(
                (publication) => publication.department === selectedDepartment
            );
        }

        setFilteredPublications(filteredData);

    };

    const fetchTableData = () => {
        PublicationService.getAllPublications()
            .then(response => {
                setTableData(response.data);
                setShowTable(true);
            })
            .catch(error => console.error('Error fetching table data:', error));
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
                            <Link to="/publications" className="sidebar-analytics-link sidebar-menu-link-active">
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
                <header className="dashboard-header">
                    <h1 className="dashboard-header-h1">Publication Details</h1>
                    <div className="admin-header-info">
                        <span className="admin-name">{userName}</span>
                        <Link to="/account" >
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
                    <select
                        id="departmentFilter"
                        className="filter-select"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="All Departments">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Biotechnology">Biotechnology</option>
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

                <div className="data-visualizations">
                    <div className="data-card">
                        <h3 className="data-card-h3">Publications Trend</h3>
                        <div className="bar-graph-container">
                            {loading ? (
                                "Loading..."
                            ) : error ? (
                                error
                            ) : (
                                <>
                                    {filteredPublications.length > 0 ? (
                                        <>
                                            {/* Render Chart Component */}
                                            <div ref={targetRef}>
                                                <PublicationsTrendChart data={filteredPublications} />
                                            </div>
                                        </>
                                    ) : (
                                        "No data available"
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table (Only shown when View Table button is clicked) */}
                {showTable && (
                    <div className="table-container">
                        <h3>Publication Data</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length > 0 ? (
                                    tableData.map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.id || 'N/A'}</td>
                                            <td>{row.publicationName || 'N/A'}</td>
                                            <td>{row.facultyName || 'N/A'}</td>
                                            <td>{row.department || 'N/A'}</td>
                                            <td>{row.year || 'N/A'}</td>
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

export default Publications;

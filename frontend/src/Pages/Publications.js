import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PublicationsTrendChart from '../components/Line3.js';
import './Dashboard.css';
import PublicationService from '../services/PublicationService';
import { usePDF } from 'react-to-pdf';
import html2pdf from 'html2pdf.js'; 

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [filteredPublications, setFilteredPublications] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [selectedType, setSelectedType] = useState("All Types");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const { toPDF, targetRef } = usePDF({ filename: 'publications.pdf' });
    const [userInitials, setUserInitials] = useState("");
    const [userName, setUserName] = useState("");

    const tableRef = useRef(); 

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

    const applyFilters = () => {
        let filteredData = publications;

        if (selectedDepartment !== "All Departments") {
            filteredData = filteredData.filter(pub => pub.department === selectedDepartment);
        }

        if (selectedType !== "All Types") {
            filteredData = filteredData.filter(pub => pub.type.toLowerCase() === selectedType.toLowerCase());
        }

        setFilteredPublications(filteredData);
    };

    const fetchTableData = () => {
        setTableData(filteredPublications);
        setShowTable(true);
    };

    
    const exportTableToPDF = () => {
        const element = tableRef.current;
        const opt = {
            margin:       0.5,
            filename:     'publication_table.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

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
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-header-h1">Publication Details</h1>
                    <div className="admin-header-info">
                        <span className="admin-name">{userName}</span>
                        <Link to="/account">
                            <div className="profile-pic-header">{userInitials}</div>
                        </Link>
                    </div>
                </header>

                {/* Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <h3>Total Students</h3>
                        <p>40</p>
                        <p>All departments</p>
                    </div>
                    <div className="stat-card">
                        <h3>Placement Rate</h3>
                        <p>87.5%</p>
                        <p>2024-2025 batch</p>
                    </div>
                    <div className="stat-card">
                        <h3>Events Participation</h3>
                        <p>78%</p>
                        <p>Co-curricular</p>
                    </div>
                    <div className="stat-card">
                        <h3>Publications</h3>
                        <p>35</p>
                        <p>Last year</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-container">
                    <label htmlFor="departmentFilter">Department:</label>
                    <select
                        id="departmentFilter"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="filter-select"
                    >
                        <option value="All Departments">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Biotechnology">Biotechnology</option>
                    </select>

                    <label htmlFor="type-select">Filter by Type:</label>
                    <select
                        id="type-select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="All Types">All Types</option>
                        <option value="Journal">Journal</option>
                        <option value="Conference">Conference</option>
                        <option value="Thesis">Thesis</option>
                        <option value="Technical Reports">Technical Reports</option>
                    </select>

                    <button className="apply-filters-button" onClick={applyFilters}>Apply Filters</button>
                    <button className="apply-filters-button" onClick={() => toPDF()}>Export Chart as PDF</button>
                    <button
                        className="apply-filters-button"
                        onClick={() => {
                            fetchTableData();
                            setShowTable(!showTable);
                        }}
                    >
                        {showTable ? "Hide Table" : "View Table"}
                    </button>

                    {showTable && (
                        <button className="apply-filters-button" onClick={exportTableToPDF}>
                            Export Table as PDF
                        </button>
                    )}
                </div>

                {/* Chart */}
                <div className="data-visualizations">
                    <div className="data-card">
                        <h3>Publications Trend</h3>
                        <div className="bar-graph-container">
                            {loading ? (
                                "Loading..."
                            ) : error ? (
                                error
                            ) : filteredPublications.length > 0 ? (
                                <div ref={targetRef}>
                                    <PublicationsTrendChart data={filteredPublications} />
                                </div>
                            ) : (
                                "No data available"
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                {showTable && (
                    <div className="table-container" ref={tableRef}>
                        <h3>Publication Data</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Department</th>
                                    <th>Year</th>
                                    <th>Type</th>
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
                                            <td>{row.type || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="no-data-message">No data available</td>
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

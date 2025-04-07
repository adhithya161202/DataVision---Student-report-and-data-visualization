import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SocietyChart from '../components/Pie2.js';
import SocietyService from '../services/SocietyService';
import { usePDF } from 'react-to-pdf';
import html2pdf from 'html2pdf.js';
import './Dashboard.css';

const Societies = () => {
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [filteredSocieties, setFilteredSocieties] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const { toPDF, targetRef } = usePDF({ filename: 'societies_chart.pdf' });

    const tableRef = useRef();
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
        SocietyService.getAllSocieties()
            .then(response => {
                setSocieties(response.data);
                setFilteredSocieties(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching societies:', error);
                setError('Failed to fetch society data');
                setLoading(false);
            });
    }, []);

    const applyFilters = () => {
        let filteredData = societies;
        if (startYear && endYear) {
            filteredData = societies.filter(
                society => society.batchYear >= startYear && society.batchYear <= endYear
            );
        }
        setFilteredSocieties(filteredData);
    };

    const fetchTableData = () => {
        setShowTable(true);
    };

    const exportTableToPDF = () => {
        const element = tableRef.current;
        const opt = {
            margin: 0.5,
            filename: 'society_table.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="dashboard-container">
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
                            <Link to="/Societies" className="sidebar-analytics-link sidebar-menu-link-active">
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
                            <Link to="/contact" className="sidebar-settings-link">
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
                    <h1 className="dashboard-header-h1">Society Details</h1>
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
                    <label className="filter-label">Start Year:</label>
                    <select className="filter-select" value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                        <option value="">All Years</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </select>

                    <label className="filter-label">End Year:</label>
                    <select className="filter-select" value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                        <option value="">All Years</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </select>

                    <button className="apply-filters-button" onClick={applyFilters}>
                        Apply Filters
                    </button>
                    <button className="apply-filters-button" onClick={() => toPDF()}>
                        Export Chart PDF
                    </button>
                    <button className="apply-filters-button" onClick={() => {
                        fetchTableData();
                        setShowTable(!showTable);
                    }}>
                        {showTable ? "Hide Table" : "View Table"}
                    </button>

                    {showTable && (
                        <button className="apply-filters-button" onClick={exportTableToPDF}>
                            Export Table PDF
                        </button>
                    )}
                </div>

                {/* Society Chart */}
                <div className="data-visualizations">
                    <div className="data-card">
                        <h3 className="data-card-h3">Societies Chart</h3>
                        <div className="bar-graph-container">
                            {loading ? (
                                <p>Loading chart data...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <div ref={targetRef}>
                                    <SocietyChart data={filteredSocieties} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Society Table */}
                {showTable && (
                    <div className="table-container" ref={tableRef}>
                        <h3 className="data-card-h3">Society Table</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Society Name</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSocieties.map((society, index) => (
                                    <tr key={index}>
                                        <td>{society.id}</td>
                                        <td>{society.studentName}</td>
                                        <td>{society.societyName}</td>
                                        <td>{society.batchYear}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Societies;

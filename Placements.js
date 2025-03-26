import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlacementChart from '../components/Pie.js';
import './Dashboard.css';
import PlacementService from '../services/PlacementService';
import { usePDF } from 'react-to-pdf';

const Placement = () => {
    const [placements, setPlacements] = useState([]);
    const [filteredPlacements, setFilteredPlacements] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toPDF, targetRef } = usePDF({ filename: 'placements.pdf' });

    useEffect(() => {
        setLoading(true);
        PlacementService.getAllPlacements()
            .then(response => {
                setPlacements(response.data);
                setFilteredPlacements(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching placements:', error);
                setError('Failed to fetch placement data');
                setLoading(false);
            });
    }, []);

    const applyFilters = () => {
        let filteredData = placements;

        if (startYear && endYear) {
            filteredData = filteredData.filter(
                (placement) => placement.year >= parseInt(startYear) && placement.year <= parseInt(endYear)
            );
        }

        if (selectedDepartment !== "All Departments") {
            filteredData = filteredData.filter(
                (placement) => placement.department === selectedDepartment
            );
        }

        setFilteredPlacements(filteredData);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-header-h2">DATA VISION</h2>
                    <div className="profile-section"></div>
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
                            <Link to="/Placement" className="sidebar-analytics-link  sidebar-analytics-link-active">
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
                            <Link to="/Account" className="sidebar-settings-link">
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
                        <span className="admin-name">Admin User</span>
                        <Link to="/Account" >
                            <div className="profile-pic-header">AD</div>
                        </Link>

                    </div>
                </header>
                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Total Students</h3>
                        <p className="stat-card-p">1,245</p>
                        <p className="stat-card-p">All departments</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Placement Rate</h3>
                        <p className="stat-card-p">92%</p>
                        <p className="stat-card-p">2024-2025 batch</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Events Participation</h3>
                        <p className="stat-card-p">78%</p>
                        <p className="stat-card-p">Co-curricular</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Publications</h3>
                        <p className="stat-card-p">45</p>
                        <p className="stat-card-p">Last year</p>
                    </div>
                </div>
                {/* Filters */}
                <div className="filters-container">
                    <label className="filter-label">Start Year</label>
                    <select
                        className="filter-select"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                    >
                        <option value="null">-</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                    <label className="filter-label">End Year</label>
                    <select
                        className="filter-select"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                    >
                        <option value="null">-</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                    <label className="filter-label">Department:</label>
                    <select
                        className="filter-select"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="All Departments">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                    </select>

                    <button className="apply-filters-button" onClick={applyFilters}>
                        Apply Filters
                    </button>
                    <button className="apply-filters-button" onClick={() => toPDF()}>Export as PDF</button>
                </div>

                {/* Data Visualizations */}
                <div className="data-visualizations">
                    <div className="data-card">
                        <h3 className="data-card-h3">Placements by Company</h3>
                        <div className="bar-graph-container">
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : filteredPlacements.length > 0 ? (
                                <div ref={targetRef}>
                                    <PlacementChart data={filteredPlacements} />
                                </div>
                            ) : (
                                <p>No placement data available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Placement;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlacementChart from '../components/Pie.js';
import './Dashboard.css';
import PlacementService from '../services/PlacementService';
import { usePDF } from 'react-to-pdf';
import axios from 'axios';


const Placement = () => {
    const [placements, setPlacements] = useState([]);
    const [filteredPlacements, setFilteredPlacements] = useState([]);
    const [selectedYear, setSelectedYear] = useState("All Years");
    const [loading, setLoading] = useState(true); // Initialize as true
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const { toPDF, targetRef } = usePDF({ filename: 'Placement.pdf' });
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
        PlacementService.getAllPlacements()
            .then(response => {
                console.log("API Response:", response.data);
                setPlacements(response.data);
                setFilteredPlacements(response.data); // Initialize filtered data
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching placements:', error);
                setError('Failed to fetch placement data');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/placements/all');
                setTableData(response.data);
            } catch (error) {
                console.error("Error fetching table data:", error);
            }
        };

        fetchTableData();
    }, []);

    // ... existing c






    // const applyFilters = () => {
    //     console.log("Selected Year:", selectedYear);

    //     if (selectedYear === "All Years") {
    //         setFilteredPlacements(placements);
    //         console.log("Filtered Placements (All Years):", placements);
    //     } else {
    //         const filteredData = placements.filter(
    //             (placement) => placement.year === parseInt(selectedYear)
    //         );
    //         setFilteredPlacements(filteredData);
    //         console.log("Filtered Placements:", filteredData);
    //     }
    // };

    const fetchTableData = () => {
        axios.get('http://localhost:8080/api/placements/all')
            .then(response => {
                setTableData(response.data); // Store fetched data in state
                setShowTable(true); // Show the table
            })
            .catch(error => console.error("Error fetching table data:", error));
    };

    const applyFilters = () => {
        let filteredData = placements;

        if (selectedYear !== "All Years") {
            filteredData = filteredData.filter(
                (placement) => placement.year === parseInt(selectedYear)
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
            </div>


            <div className="main-content">
                <header className="dashboard-header">
                    <h1 className="dashboard-header-h1">Student Analytics Dashboard</h1>
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
                        <p className="stat-card-p">All departments</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Placement Rate</h3>
                        <p className="stat-card-p">87.5%</p>
                        <p className="stat-card-p">2024-2025 batch</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Events Participation</h3>
                        <p className="stat-card-p">78%</p>
                        <p className="stat-card-p">Co-curricular</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-card-h3">Publications</h3>
                        <p className="stat-card-p">35</p>
                        <p className="stat-card-p">Last year</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-container">
                    <label htmlFor="yearFilter" className="filter-label">Year:</label>
                    <select
                        id="yearFilter"
                        className="filter-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="All Years">All Years</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                    <label htmlFor="departmentFilter" className="filter-label">Department:</label>
                    <select
                        id="departmentFilter"
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
                    <button className="apply-filters-button" onClick={() => setShowTable(!showTable)}>
                        {showTable ? "Hide Table" : "View Table"}
                    </button>
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

                {showTable && (
                    <div className="table-container">
                        <h3>Placement Data</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Year</th>
                                    <th>Company</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id || 'N/A'}</td>
                                        <td>{row.studentName || 'N/A'}</td>
                                        <td>{row.year || 'N/A'}</td>
                                        <td>{row.company || 'N/A'}</td>
                                        <td>{row.department || 'N/A'}</td>
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

export default Placement;
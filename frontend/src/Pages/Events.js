import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import EventParticipationChart from '../components/Bar1.js';
import './Dashboard.css';
import axios from 'axios';
import { usePDF } from 'react-to-pdf';
import html2pdf from 'html2pdf.js';

const Events = () => {
    const [eventsData, setEventsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [startYear, setStartYear] = useState("all");
    const [endYear, setEndYear] = useState("all");
    const [selectedEventType, setSelectedEventType] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [tableData, setTableData] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [userInitials, setUserInitials] = useState("");
    const [userName, setUserName] = useState("");

    const { toPDF, targetRef } = usePDF({ filename: 'events-chart.pdf' });
    const tableRef = useRef();

    const eventCategories = {
        Cultural: ["Dance Battle", "Drama Fest", "Singing Contest", "Music Band", "Poetry Slam", "Painting Competition"],
        Technical: ["Hackathon", "Tech Quiz", "Robotics Workshop", "Coding Challenge", "Blockchain Challenge", "CAD Design Contest", "IoT Challenge", "Bridge Design", "Data Science Contest", "AI Model Challenge"],
        Sports: ["Inter NIT Football Women", "Inter NIT Football Men", "Inter NIT Badminton Women", "Inter NIT Table Tennis Women", "Inter NIT Basketball Championship", "Inter NIT Volleyball Men", "Inter NIT Athletics Men", "Inter NIT Powerlifting Men", "Inter NIT Tennis Championship", "Inter NIT Marathon"]
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/events")
            .then(response => {
                setEventsData(response.data);
                setFilteredData(response.data);
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
        let filtered = eventsData.filter(event => event && typeof event === 'object');

        if (selectedDepartment !== 'all') {
            filtered = filtered.filter(event => event.department === selectedDepartment);
        }

        if (startYear !== 'all' && endYear !== 'all') {
            filtered = filtered.filter(event =>
                event.year &&
                event.year >= parseInt(startYear) &&
                event.year <= parseInt(endYear)
            );
        }

        if (selectedEventType !== 'all') {
            filtered = filtered.filter(event =>
                event.eventType &&
                event.eventType.toLowerCase() === selectedEventType.toLowerCase()
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(event =>
                event.eventCategory &&
                event.eventCategory.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        setFilteredData(filtered);
    };

    const fetchTableData = () => {
        setTableData(filteredData);
        setShowTable(true);
    };

    const handlePrint = () => {
        if (!tableRef.current) return;

        const opt = {
            margin: 0.5,
            filename: 'EventParticipationData.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(tableRef.current).save();
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
                        <li className="sidebar-analytics-li"><Link to="/Placement" className="sidebar-analytics-link"><i className="fas fa-chart-bar main-icons"></i>Placement</Link></li>
                        <li className="sidebar-analytics-li"><Link to="/Events" className="sidebar-analytics-link sidebar-menu-link-active"><i className="fas fa-calendar-alt main-icons"></i>Events</Link></li>
                        <li className="sidebar-analytics-li"><Link to="/publications" className="sidebar-analytics-link"><i className="fas fa-newspaper main-icons"></i>Publications</Link></li>
                        <li className="sidebar-analytics-li"><Link to="/societies" className="sidebar-analytics-link"><i className="fas fa-users main-icons"></i>Societies</Link></li>
                    </ul>
                </div>

                <div className="sidebar-settings">
                    <p className="sidebar-settings-p">SETTINGS</p>
                    <ul className="sidebar-settings-ul">
                        <li className="sidebar-settings-li"><Link to="/preferences" className="sidebar-settings-link"><i className="fas fa-cog main-icons"></i>Account</Link></li>
                        <li className="sidebar-settings-li"><Link to="/Contact" className="sidebar-settings-link"><i className="fas fa-question-circle main-icons"></i>Contact</Link></li>
                        <li className="sidebar-settings-li"><Link to="/" className="sidebar-settings-link"><i className="fas fa-sign-out-alt main-icons"></i>Logout</Link></li>
                    </ul>
                </div>
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

                {/* Filters */}
                <div className="filters-container">
                    <label className="filter-label">Department:</label>
                    <select className="filter-select" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                        <option value="all">All Departments</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Civil">Civil</option>
                    </select>

                    <label className="filter-label">Event Type:</label>
                    <select className="filter-select" value={selectedEventType} onChange={(e) => {
                        setSelectedEventType(e.target.value);
                        setSelectedCategory("all");
                    }}>
                        <option value="all">All Types</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Technical">Technical</option>
                        <option value="Sports">Sports</option>
                    </select>

                    <label className="filter-label">Event Category:</label>
                    <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        {selectedEventType !== "all" && eventCategories[selectedEventType].map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    <label className="filter-label">Start Year:</label>
                    <select className="filter-select" value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                        <option value="all">All Years</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                    <label className="filter-label">End Year:</label>
                    <select className="filter-select" value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                        <option value="all">All Years</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                    <button className="apply-filters-button" onClick={applyFilters}>Apply Filters</button>
                    <button className="apply-filters-button" onClick={toPDF}>Export Chart as PDF</button>
                    <button className="apply-filters-button" onClick={() => {
                        if (!showTable) fetchTableData();
                        setShowTable(!showTable);
                    }}>
                        {showTable ? "Hide Table" : "View Table"}
                    </button>

                    {showTable && (
                        <button className="apply-filters-button" onClick={handlePrint}>Export Table as PDF</button>
                    )}
                </div>

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

                {/* Data Table */}
                {showTable && (
                    <div className="table-container" ref={tableRef}>
                        <h3>Event Participation Data</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Name</th>
                                    <th>Event Name</th>
                                    <th>Year</th>
                                    <th>Department</th>
                                    <th>Event Type</th>
                                    <th>Event Category</th>
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
                                            <td>{row.eventType || 'N/A'}</td>
                                            <td>{row.eventCategory || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="no-data-message">No data available</td>
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

import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Megaphone, TrendingUp } from 'lucide-react';
import { getAnalytics } from '../services/firebaseService';
import { readFromGoogleSheets } from '../services/googleSheets';
import '../styles/Dashboard.css';

const Dashboard = ({ user }) => {
    const [analytics, setAnalytics] = useState({
        totalLeads: 0,
        totalUsers: 0,
        totalCampaigns: 0,
        recentLeads: []
    });
    const [sheetLeads, setSheetLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            loadDashboardData();
        }
    }, [user]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [analyticsData, sheetsData] = await Promise.all([
                getAnalytics(user.uid),
                readFromGoogleSheets()
            ]);

            setAnalytics(analyticsData);
            setSheetLeads(sheetsData);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="stat-card" style={{ color: color }}>
            <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${color}22, ${color}11)` }}>
                <Icon size={28} style={{ color }} />
            </div>
            <div className="stat-content">
                <h3>{title}</h3>
                <p className="stat-value">{loading ? '...' : value}</p>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard Overview</h1>
                <p className="dashboard-subtitle">
                    <span className="stylish-font text-gradient" style={{ fontSize: '1.25rem', marginRight: '8px' }}>Welcome back!</span>
                    Here's what's happening today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatCard
                    icon={Users}
                    title="Total Users"
                    value={analytics.totalUsers}
                    color="#2563eb"
                />
                <StatCard
                    icon={UserPlus}
                    title="Total Leads"
                    value={analytics.totalLeads + sheetLeads.length}
                    color="#16a34a"
                />
                <StatCard
                    icon={Megaphone}
                    title="Active Campaigns"
                    value={analytics.totalCampaigns}
                    color="#dc2626"
                />
                <StatCard
                    icon={TrendingUp}
                    title="Growth Rate"
                    value="+12.5%"
                    color="#9333ea"
                />
            </div>

            {/* Recent Leads */}
            <div className="recent-section">
                <h2>Recent Leads</h2>
                <div className="leads-table-container">
                    {loading ? (
                        <div className="loading">Loading leads...</div>
                    ) : (
                        <table className="leads-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Number</th>
                                    <th>Remarks</th>
                                    <th>Source</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.recentLeads.slice(0, 5).map((lead, index) => (
                                    <tr key={lead.id || index}>
                                        <td>{lead.name}</td>
                                        <td>{lead.number}</td>
                                        <td>{lead.remarks}</td>
                                        <td><span className="badge badge-firebase">Firebase</span></td>
                                        <td>{lead.createdAt ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                                {sheetLeads.slice(0, 3).map((lead, index) => (
                                    <tr key={`sheet-${index}`}>
                                        <td>{lead.name}</td>
                                        <td>{lead.number}</td>
                                        <td>{lead.remarks}</td>
                                        <td><span className="badge badge-sheets">Sheets</span></td>
                                        <td>{lead.timestamp || 'N/A'}</td>
                                    </tr>
                                ))}
                                {analytics.recentLeads.length === 0 && sheetLeads.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                            No leads yet. Start generating leads!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

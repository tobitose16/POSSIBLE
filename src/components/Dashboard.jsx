import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Megaphone, TrendingUp, MoreHorizontal, Filter } from 'lucide-react';
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

    const StatCard = ({ icon: Icon, title, value, color, growth, isActive }) => (
        <div className={`dark-stat-card ${isActive ? 'active-border' : ''}`} style={{ '--card-color': color }}>
            <div className="dark-stat-header">
                <div className="dark-stat-icon" style={{ background: `${color}22` }}>
                    <Icon size={20} style={{ color }} />
                </div>
                {growth && <div className="dark-stat-growth" style={{ color: color === '#ef4444' ? '#94a3b8' : '#10b981', background: color === '#ef4444' ? 'rgba(255,255,255,0.1)' : 'rgba(16,185,129,0.1)' }}>
                    {growth}
                </div>}
            </div>
            <div className="dark-stat-content">
                <h3>{title}</h3>
                <p className="dark-stat-value">{loading ? '...' : value}</p>
            </div>
        </div>
    );

    return (
        <div className="dark-dashboard">
            <div className="dark-topbar">
                <div className="dark-system-status">
                    <span className="dot green"></span> System Operational
                    <span className="divider">|</span>
                    <span className="latency">API Latency: 24ms</span>
                </div>
                <div className="dark-stream-active">
                    <span className="stream-badge">REAL-TIME DATA STREAM ACTIVE</span>
                    <span className="versionstamp">v2.4.0-stable</span>
                </div>
            </div>

            <div className="dark-dashboard-header">
                <div className="header-titles">
                    <h1>Insights Dashboard</h1>
                    <p className="dashboard-subtitle">
                        <span className="greeting">Good evening.</span> AI Outreach performance overview.
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn-dark-outline">Generate Report</button>
                    <button className="btn-primary">New Campaign</button>
                </div>
            </div>

            <div className="dark-stats-grid">
                <StatCard icon={Users} title="TOTAL USERS" value={(analytics.totalUsers + 2000).toLocaleString()} color="#3b82f6" growth="↑ 12%" />
                <StatCard icon={UserPlus} title="TOTAL LEADS" value={(analytics.totalLeads + sheetLeads.length + 8900).toLocaleString()} color="#10b981" growth="↑ 8%" />
                <StatCard icon={Megaphone} title="ACTIVE CAMPAIGNS" value={analytics.totalCampaigns + 12} color="#ef4444" growth="Active" isActive={true} />
                <StatCard icon={TrendingUp} title="GROWTH RATE" value="12.5%" color="#a855f7" growth="↑ 2.5%" />
            </div>

            <div className="dark-recent-section">
                <div className="recent-header">
                    <h2><span className="table-icon">🗂️</span> Recent Leads</h2>
                    <div className="table-actions">
                        <button className="icon-btn"><Filter size={16} /></button>
                        <button className="icon-btn"><MoreHorizontal size={16} /></button>
                    </div>
                </div>
                <div className="dark-table-container">
                    <table className="dark-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>NUMBER</th>
                                <th>REMARKS</th>
                                <th>SOURCE</th>
                                <th>DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="user-cell">
                                        <div className="avatar bg-blue">TT</div>
                                        <span>Tobi Tose</span>
                                    </div>
                                </td>
                                <td>623-830-1744</td>
                                <td>High interest in AI</td>
                                <td><span className="source-badge firebase">FIREBASE</span></td>
                                <td>2026-02-05</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="user-cell">
                                        <div className="avatar bg-purple">SJ</div>
                                        <span>Sarah Jenkins</span>
                                    </div>
                                </td>
                                <td>805-550-1923</td>
                                <td>Interested in Pro plan</td>
                                <td><span className="source-badge website">WEBSITE</span></td>
                                <td>2026-02-04</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="user-cell">
                                        <div className="avatar bg-green">MC</div>
                                        <span>Michael Chang</span>
                                    </div>
                                </td>
                                <td>415-990-2341</td>
                                <td>Follow up next week</td>
                                <td><span className="source-badge referral">REFERRAL</span></td>
                                <td>2026-02-04</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="table-pagination">
                        Showing 1-3 of 3 <span className="pagi-arrows"><span>{'<'}</span><span>{'>'}</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

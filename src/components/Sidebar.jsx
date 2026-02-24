import React, { useState } from 'react';
import {
    LayoutDashboard,
    UserPlus,
    Megaphone,
    BarChart2,
    Settings,
    LogOut,
    Hexagon,
    ArrowRightFromLine
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange, user, onLogout, isMobileOpen, isMobile }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const mainItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'leads', icon: UserPlus, label: 'Lead Intelligence' },
        { id: 'campaigns', icon: Megaphone, label: 'Campaigns' },
        { id: 'analytics', icon: BarChart2, label: 'Analytics' }
    ];

    const systemItems = [
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    const getDisplayName = () => {
        if (!user?.email) return 'Admin Command...';
        const emailParts = user.email.split('@');
        return emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile && isMobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Hexagon size={28} fill="#3b82f6" color="#ffffff" className="logo-icon" />
                    {!isCollapsed && <h2>AutoConnect AI</h2>}
                </div>
            </div>

            <nav className="sidebar-nav">
                {!isCollapsed && <div className="nav-group-label">MAIN MENU</div>}
                {mainItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => onSectionChange(item.id)}
                            title={isCollapsed ? item.label : ''}
                        >
                            <Icon size={20} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}

                {!isCollapsed && <div className="nav-group-label mt-4">SYSTEM</div>}
                {systemItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => onSectionChange(item.id)}
                            title={isCollapsed ? item.label : ''}
                        >
                            <Icon size={20} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {!isCollapsed && activeSection === 'campaigns' && (
                <div className="sidebar-radar">
                    <div className="radar-header">CAMPAIGN SUCCESS RADAR</div>
                    <div className="radar-chart">
                        {/* SVG Placeholder for Radar Chart */}
                        <svg viewBox="0 0 100 100" className="radar-svg">
                            <polygon points="50,5 95,35 80,90 20,90 5,35" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
                            <polygon points="50,20 80,42 65,75 35,75 20,42" fill="none" stroke="#93c5fd" strokeWidth="1" />
                            <line x1="50" y1="50" x2="50" y2="5" stroke="#e2e8f0" strokeWidth="1" />
                            <line x1="50" y1="50" x2="95" y2="35" stroke="#e2e8f0" strokeWidth="1" />
                            <line x1="50" y1="50" x2="80" y2="90" stroke="#e2e8f0" strokeWidth="1" />
                            <line x1="50" y1="50" x2="20" y2="90" stroke="#e2e8f0" strokeWidth="1" />
                            <line x1="50" y1="50" x2="5" y2="35" stroke="#e2e8f0" strokeWidth="1" />
                        </svg>
                        <div className="radar-score">Overall Score: 88</div>
                    </div>
                </div>
            )}

            <div className="sidebar-footer">
                {!isCollapsed ? (
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.email?.charAt(0).toUpperCase() || 'A'}
                            <div className="status-dot"></div>
                        </div>
                        <div className="user-details">
                            <p className="user-name">{getDisplayName()}</p>
                            <p className="user-role">System Online</p>
                        </div>
                        <button className="logout-btn" onClick={onLogout} title="Logout">
                            <ArrowRightFromLine size={18} />
                        </button>
                    </div>
                ) : (
                    <button className="logout-btn-collapsed" onClick={onLogout} title="Logout">
                        <ArrowRightFromLine size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

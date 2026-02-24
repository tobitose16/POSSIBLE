import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, ClipboardList, BrainCircuit, Search, Moon, Bell, Plus, Download, ChevronDown, Phone, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { getLeads } from '../services/firebaseService';
import '../styles/LeadGeneration.css';

const LeadGeneration = ({ user }) => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        if (user?.uid) {
            loadLeads();
        }
    }, [user]);

    const loadLeads = async () => {
        try {
            const leadsData = await getLeads(user.uid);
            setLeads(leadsData);
        } catch (error) {
            console.error('Error loading leads:', error);
        }
    };

    const topStats = [
        { label: "TOTAL LEADS", value: "2,543", icon: Users, color: "blue" },
        { label: "CONVERTED", value: "342", icon: CheckCircle, color: "green" },
        { label: "PENDING ACTION", value: "128", icon: ClipboardList, color: "orange" },
        { label: "HIGH SENTIMENT", value: "85%", icon: BrainCircuit, color: "purple" }
    ];

    const mockLeads = [
        { id: 1, name: "Sarah Miller", email: "sarah.m@techcorp.com", company: "TechCorp Inc.", status: "Interested", sentiment: "Positive", match: 88, interaction: "Voice Call", time: "2 hours ago", interactionType: "phone", initial: "SM", avatarBg: "bg-blue" },
        { id: 2, name: "John Doe", email: "j.doe@logistics.io", company: "Logistics IO", status: "New Lead", sentiment: "Neutral", match: 50, interaction: "Email Form", time: "1 day ago", interactionType: "mail", initial: "JD", avatarBg: "bg-purple" },
        { id: 3, name: "Michael Chen", email: "mchen@innovate.net", company: "Innovate Networks", status: "Follow Up", sentiment: "Mixed", match: 42, interaction: "Missed Call", time: "Yesterday", interactionType: "alert", initial: "MC", avatarBg: "bg-orange" },
        { id: 4, name: "Unknown User", email: "temp.contact@gmail.com", company: "--", status: "Unqualified", sentiment: "Negative", match: 12, interaction: "SMS", time: "3 days ago", interactionType: "msg", initial: "?", avatarBg: "bg-gray" }
    ];

    return (
        <div className="lead-intel-center">
            {/* Header */}
            <div className="lic-header">
                <div className="lic-title">
                    <h1>Futuristic Lead Intelligence Center</h1>
                    <div className="lic-subtitle">
                        SYSTEM STATUS: <span>OPTIMAL</span>
                    </div>
                </div>
                <div className="lic-actions">
                    <div className="lic-search">
                        <Search size={16} />
                        <input type="text" placeholder="Search database..." />
                    </div>
                    <button className="icon-btn-round"><Moon size={18} /></button>
                    <button className="icon-btn-round with-dot"><Bell size={18} /><div className="red-dot"></div></button>
                    <button className="btn-primary-pill">
                        <Plus size={16} /> NEW LEAD
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="lic-stats-row">
                {topStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className={`lic-stat-card border-${stat.color}`}>
                            <div className={`lic-stat-icon bg-${stat.color}-light`}>
                                <Icon size={22} className={`text-${stat.color}`} />
                            </div>
                            <div className="lic-stat-info">
                                <span className="lic-stat-label">{stat.label}</span>
                                <span className="lic-stat-value">{stat.value}</span>
                            </div>
                            <div className={`lic-stat-bg-icon text-${stat.color}-light`}><Icon size={64} /></div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="lic-filters-bar">
                <div className="lic-filter-group">
                    <button className="filter-dropdown">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
                        Status <ChevronDown size={14} />
                    </button>
                    <button className="filter-dropdown">
                        <Calendar size={14} />
                        Date Range <ChevronDown size={14} />
                    </button>
                    <button className="filter-dropdown">
                        <Folder size={14} />
                        Source <ChevronDown size={14} />
                    </button>
                    <div className="divider"></div>
                    <button className="icon-btn-square"><Download size={16} /></button>
                </div>
            </div>

            {/* Table */}
            <div className="lic-table-header">
                <div>LEAD PROFILE</div>
                <div>COMPANY</div>
                <div>STATUS</div>
                <div>AI SENTIMENT</div>
                <div>LAST INTERACTION</div>
                <div className="text-right">ACTIONS</div>
            </div>

            <div className="lic-leads-list">
                {mockLeads.map((lead) => (
                    <div key={lead.id} className="lic-lead-row">
                        <div className="lead-col-profile">
                            <div className={`lead-avatar ${lead.avatarBg}`}>{lead.initial}</div>
                            <div className="lead-name-email">
                                <strong>{lead.name}</strong>
                                <span>{lead.email}</span>
                            </div>
                        </div>
                        <div className="lead-col-company">
                            <span className="building-icon">🏢</span> {lead.company}
                        </div>
                        <div className="lead-col-status">
                            <span className={`status-pill pill-${lead.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                <div className="dot"></div> {lead.status}
                            </span>
                        </div>
                        <div className="lead-col-sentiment">
                            <div className="sentiment-header">
                                <span className={`text-${lead.sentiment.toLowerCase()}`}>{lead.sentiment}</span>
                                <strong>{lead.match}%</strong>
                            </div>
                            <div className="sentiment-bar-bg">
                                <div className={`sentiment-bar fill-${lead.sentiment.toLowerCase()}`} style={{ width: `${lead.match}%` }}></div>
                            </div>
                        </div>
                        <div className="lead-col-interaction">
                            <div className="interaction-header">
                                <span className={`interaction-dot dot-${lead.interactionType}`}></span>
                                <span>{lead.interaction}</span>
                            </div>
                            <span className="interaction-time">{lead.time}</span>
                        </div>
                        <div className="lead-col-actions text-right">
                            <button className="action-btn">View</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="lic-pagination">
                <div className="pagi-info">
                    Showing <strong>1-4</strong> of <strong>2,543</strong> leads
                </div>
                <div className="pagi-controls">
                    <button className="pagi-btn disabled">Previous</button>
                    <button className="pagi-btn active">1</button>
                    <button className="pagi-btn">2</button>
                    <button className="pagi-btn">3</button>
                    <span className="pagi-dots">...</span>
                    <button className="pagi-btn">Next</button>
                </div>
            </div>
        </div>
    );
};

// SVG icons as components for smaller footprint
const Calendar = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const Folder = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;

export default LeadGeneration;

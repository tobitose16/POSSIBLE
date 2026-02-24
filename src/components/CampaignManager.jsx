import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Bell, Moon, Search, Send, Activity, MessageSquare, Calendar, Play, Pause, MoreVertical, Briefcase, Stethoscope, ShoppingBag, Rocket } from 'lucide-react';
import { addCampaign, getCampaigns, getLeads } from '../services/firebaseService';
import '../styles/CampaignManager.css';

const CampaignManager = ({ user }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [leads, setLeads] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        if (user?.uid) {
            loadData();
        }
    }, [user]);

    const loadData = async () => {
        try {
            const [campaignsData, leadsData] = await Promise.all([
                getCampaigns(user.uid),
                getLeads(user.uid)
            ]);
            setCampaigns(campaignsData);
            setLeads(leadsData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const topStats = [
        { title: "Total Outreach Sent", value: "24,592", icon: Send, iconBg: "bg-blue-light", iconColor: "#3b82f6", badge: "+12.5%", badgeType: "growth" },
        { title: "Connect Rate", value: "68.4%", icon: Activity, iconBg: "bg-purple-light", iconColor: "#a855f7", badge: "+5.2%", badgeType: "growth" },
        { title: "Positive Responses", value: "1,204", icon: MessageSquare, iconBg: "bg-orange-light", iconColor: "#f59e0b", badge: "+8.1%", badgeType: "growth" },
        { title: "Meetings Booked", value: "185", icon: Calendar, iconBg: "bg-teal-light", iconColor: "#14b8a6", badge: "New", badgeType: "new" }
    ];

    return (
        <div className="campaign-manager-modern">
            {/* Top Bar matching Image 4 */}
            <div className="cm-header-bar">
                <div className="cm-header-titles">
                    <h1>Campaigns Hub</h1>
                    <p>Manage and monitor high-performance AI outreach</p>
                </div>
                <div className="cm-header-actions">
                    <div className="cm-search-bar">
                        <Search size={18} />
                        <input type="text" placeholder="Search campaigns..." />
                    </div>
                    <button className="icon-btn"><Bell size={20} /><div className="notif-dot"></div></button>
                    <button className="icon-btn"><Moon size={20} /></button>
                </div>
            </div>

            <div className="cm-controls-row">
                <div className="cm-tabs">
                    <button className={`cm-tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Active</button>
                    <button className={`cm-tab ${activeTab === 'drafts' ? 'active' : ''}`} onClick={() => setActiveTab('drafts')}>Drafts</button>
                    <button className={`cm-tab ${activeTab === 'archived' ? 'active' : ''}`} onClick={() => setActiveTab('archived')}>Archived</button>
                </div>
                <button className="btn-dark-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Create New Campaign
                </button>
            </div>

            <div className="cm-stats-grid">
                {topStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="cm-stat-card">
                            <div className="cm-stat-top">
                                <div className={`cm-stat-icon-wrapper ${stat.iconBg}`}>
                                    <Icon size={20} color={stat.iconColor} />
                                </div>
                                <span className={`cm-stat-badge ${stat.badgeType}`}>
                                    {stat.badgeType === 'growth' && <Activity size={12} />} {stat.badge}
                                </span>
                            </div>
                            <div className="cm-stat-body">
                                <h2>{stat.value}</h2>
                                <p>{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cm-active-section">
                <h3 className="cm-section-title">
                    <div className="title-marker"></div>
                    Active Campaigns
                </h3>

                <div className="cm-cards-grid">
                    {/* Mock Card 1 */}
                    <div className="cm-campaign-card">
                        <div className="card-header">
                            <div className="card-logo bg-blue-grad">
                                <Rocket size={24} color="white" />
                            </div>
                            <div className="card-info">
                                <h4>Tech Startups Outreach</h4>
                                <span>SAAS • COLD CALL</span>
                            </div>
                            <div className="card-live-badge"><div className="dot"></div> LIVE</div>
                            <button className="more-btn"><MoreVertical size={16} /></button>
                        </div>
                        <div className="card-chart">
                            <p className="chart-label"><div className="dot-blue"></div> PERFORMANCE (7D)</p>
                            <div className="bar-chart-mock">
                                <div className="bar" style={{ height: '30%' }}></div>
                                <div className="bar" style={{ height: '40%' }}></div>
                                <div className="bar" style={{ height: '25%' }}></div>
                                <div className="bar" style={{ height: '60%' }}></div>
                                <div className="bar" style={{ height: '80%' }}></div>
                                <div className="bar" style={{ height: '45%' }}></div>
                                <div className="bar" style={{ height: '90%' }}></div>
                            </div>
                        </div>
                        <div className="card-stats">
                            <div><p>LEADS</p><strong>1,250</strong></div>
                            <div><p>CALLS</p><strong>843</strong></div>
                            <div><p>CONVERSION</p><strong className="text-green">12.4%</strong></div>
                        </div>
                        <div className="card-actions">
                            <button className="btn-light">View Details</button>
                            <button className="btn-light-icon"><Pause size={16} fill="#64748b" color="#64748b" /></button>
                        </div>
                    </div>

                    {/* Mock Card 2 */}
                    <div className="cm-campaign-card">
                        <div className="card-header">
                            <div className="card-logo bg-green-grad">
                                <Stethoscope size={24} color="white" />
                            </div>
                            <div className="card-info">
                                <h4>Healthcare Recruit</h4>
                                <span>HEALTHCARE • VOICE AGENT</span>
                            </div>
                            <div className="card-live-badge"><div className="dot"></div> LIVE</div>
                            <button className="more-btn"><MoreVertical size={16} /></button>
                        </div>
                        <div className="card-chart">
                            <p className="chart-label"><div className="dot-green"></div> PERFORMANCE (7D)</p>
                            <div className="line-chart-mock">
                                <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                                    <path d="M0,25 Q10,15 20,20 T40,15 T60,5 T80,10 T100,0" fill="none" stroke="#22c55e" strokeWidth="2" />
                                    <path d="M0,25 Q10,15 20,20 T40,15 T60,5 T80,10 T100,0 L100,30 L0,30 Z" fill="url(#greenGrad)" opacity="0.2" />
                                    <defs>
                                        <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22c55e" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="card-stats">
                            <div><p>LEADS</p><strong>540</strong></div>
                            <div><p>CALLS</p><strong>320</strong></div>
                            <div><p>CONVERSION</p><strong className="text-green">28.5%</strong></div>
                        </div>
                        <div className="card-actions">
                            <button className="btn-light">View Details</button>
                            <button className="btn-light-icon"><Pause size={16} fill="#64748b" color="#64748b" /></button>
                        </div>
                    </div>

                    {/* Mock Card 3 */}
                    <div className="cm-campaign-card paused-card">
                        <div className="card-header">
                            <div className="card-logo bg-orange-grad">
                                <ShoppingBag size={24} color="white" />
                            </div>
                            <div className="card-info">
                                <h4>Q4 Retail Promo</h4>
                                <span>RETAIL • SMS & CALL</span>
                            </div>
                            <div className="card-paused-badge"><div className="dot"></div> PAUSED</div>
                            <button className="more-btn"><MoreVertical size={16} /></button>
                        </div>
                        <div className="card-chart paused-chart">
                            <div className="paused-overlay">
                                <div className="pause-circle"><Pause size={20} color="#64748b" fill="#64748b" /></div>
                                <p className="paused-title">Campaign paused manually</p>
                                <p className="paused-subtitle">450 leads remaining in queue</p>
                            </div>
                        </div>
                        <div className="card-stats">
                            <div><p>LEADS</p><strong>2,100</strong></div>
                            <div><p>CALLS</p><strong>1,650</strong></div>
                            <div><p>CONVERSION</p><strong className="text-red">4.2%</strong></div>
                        </div>
                        <div className="card-actions">
                            <button className="btn-light">Edit Campaign</button>
                            <button className="btn-blue-icon"><Play size={16} fill="white" color="white" /></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CampaignManager;

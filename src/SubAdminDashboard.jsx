import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadGeneration from './components/LeadGeneration';
import CampaignManager from './components/CampaignManager';
import './styles/SubAdminDashboard.css';

function SubAdminDashboard({ user }) {
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard user={user} />;
            case 'leads':
                return <LeadGeneration user={user} />;
            case 'campaigns':
                return <CampaignManager user={user} />;
            default:
                return <Dashboard user={user} />;
        }
    };

    return (
        <div className="subadmin-dashboard">
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                user={user}
                onLogout={handleLogout}
            />
            <main className="main-content">
                {renderContent()}
            </main>
        </div>
    );
}

export default SubAdminDashboard;

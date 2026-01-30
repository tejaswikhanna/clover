import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Settings } from 'lucide-react';

export function Sidebar() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Research Lab', path: '/' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const sidebarStyle = {
        width: '260px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
    };

    const linkStyle = ({ isActive }) => ({
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.75rem 1rem', borderRadius: '0.5rem',
        color: isActive ? '#10b981' : '#64748b',
        backgroundColor: isActive ? '#ecfdf5' : 'transparent',
        marginBottom: '0.5rem',
        fontWeight: isActive ? 600 : 500,
        textDecoration: 'none'
    });

    return (
        <aside style={sidebarStyle}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutDashboard size={24} /> Clover
            </div>
            <nav style={{ flex: 1 }}>{navItems.map(item => (
                <NavLink key={item.path} to={item.path} style={linkStyle}>
                    <item.icon size={20} /> {item.label}
                </NavLink>
            ))}</nav>
        </aside>
    );
}

export function MainLayout() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#f8fafc', overflow: 'hidden' }}>
            <Sidebar />
            <main style={{ flex: 1, overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
}

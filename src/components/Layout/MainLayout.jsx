import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Settings } from 'lucide-react';

export function Sidebar({ isOpen, setIsOpen }) {
    const navItems = [
        { icon: LayoutDashboard, label: 'Research Lab', path: '/' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

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
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LayoutDashboard size={24} /> Clover
            </div>
            <nav style={{ flex: 1 }}>{navItems.map(item => (
                <NavLink key={item.path} to={item.path} style={linkStyle} onClick={() => setIsOpen(false)}>
                    <item.icon size={20} /> {item.label}
                </NavLink>
            ))}</nav>
        </aside>
    );
}

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="layout-container">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="main-content">
                {/* Mobile Header Toggle */}
                <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-only">
                    <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <LayoutDashboard size={24} color="#10b981" />
                    </button>
                    <span style={{ fontWeight: 600 }}>Clover</span>
                </div>
                <Outlet />
            </main>
            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
                />
            )}
        </div>
    );
}

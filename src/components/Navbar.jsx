import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    Dr. Debashis Dutta <span className="subtitle">Ophthalmologist</span>
                </Link>
                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/doctor-speaks" onClick={() => setIsOpen(false)}>Doctor Speaks</Link>
                    <Link to="/lens-selection" onClick={() => setIsOpen(false)}>Lens Selection</Link>
                    <Link to="/eye-operations" onClick={() => setIsOpen(false)}>Operations</Link>
                    <Link to="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link>
                    <Link to="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>

                    {user ? (
                        <div className="profile-menu-container" style={{ position: 'relative' }}>
                            <div
                                className="profile-trigger"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: 'var(--primary-color)' }}
                            >
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                                />
                                <span style={{ display: 'inline-block' }}>{user.name.split(' ')[0]}</span>
                            </div>
                            {showProfileMenu && (
                                <div className="profile-dropdown" style={{
                                    position: 'absolute', top: '100%', right: 0,
                                    background: 'white', padding: '1rem',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '4px',
                                    minWidth: '150px', zIndex: 100
                                }}>
                                    <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>{user.email}</div>
                                    <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '0.5rem 0' }} />
                                    <button
                                        onClick={handleLogout}
                                        style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '0.9rem', width: '100%', textAlign: 'left' }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn-primary"
                            onClick={() => setIsOpen(false)}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                            Sign In
                        </Link>
                    )}
                </div>
                <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

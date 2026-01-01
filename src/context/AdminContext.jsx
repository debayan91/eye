import { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../lib/supabase';

const AdminContext = createContext(null);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Check for existing admin session on mount
    useEffect(() => {
        const adminSession = sessionStorage.getItem('admin_session');
        if (adminSession === 'authenticated') {
            setIsAdmin(true);
        }
    }, []);

    const login = (password) => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            setIsEditing(true);
            sessionStorage.setItem('admin_session', 'authenticated');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        setIsEditing(false);
        sessionStorage.removeItem('admin_session');
    };

    const toggleEditing = () => {
        setIsEditing(prev => !prev);
    };

    return (
        <AdminContext.Provider value={{
            isAdmin,
            isEditing,
            login,
            logout,
            toggleEditing
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext;

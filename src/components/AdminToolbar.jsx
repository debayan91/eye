import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, LogOut, X } from 'lucide-react';

/**
 * AdminToolbar - Floating toolbar shown when in admin mode
 * Provides controls for toggling edit mode and logging out
 */
const AdminToolbar = () => {
    const { isAdmin, isEditing, toggleEditing, logout } = useAdmin();
    const navigate = useNavigate();

    if (!isAdmin) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6">
                {/* Status indicator */}
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isEditing ? 'bg-green-400' : 'bg-gray-400'}`} />
                    <span className="text-xs uppercase tracking-widest font-bold">
                        {isEditing ? 'Editing' : 'Preview'}
                    </span>
                </div>

                <div className="w-px h-6 bg-gray-600" />

                {/* Toggle edit mode */}
                <button
                    onClick={toggleEditing}
                    className="flex items-center gap-2 text-sm hover:text-yellow-400 transition-colors"
                    title={isEditing ? 'Switch to preview' : 'Switch to edit mode'}
                >
                    {isEditing ? (
                        <>
                            <Eye size={18} />
                            <span className="hidden sm:inline">Preview</span>
                        </>
                    ) : (
                        <>
                            <Edit size={18} />
                            <span className="hidden sm:inline">Edit</span>
                        </>
                    )}
                </button>

                <div className="w-px h-6 bg-gray-600" />

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm hover:text-red-400 transition-colors"
                    title="Exit admin mode"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Exit</span>
                </button>
            </div>

            {/* Help text when editing */}
            {isEditing && (
                <p className="text-center text-xs text-gray-500 mt-3">
                    Click any text with yellow border to edit • Changes auto-save
                </p>
            )}
        </div>
    );
};

export default AdminToolbar;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Lock, AlertCircle } from 'lucide-react';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAdmin } = useAdmin();
    const navigate = useNavigate();

    // If already logged in, redirect to home with edit mode
    if (isAdmin) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 300));

        const success = login(password);

        if (success) {
            navigate('/');
        } else {
            setError('Invalid password');
            setPassword('');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-6">
                        <Lock size={28} />
                    </div>
                    <h1 className="text-3xl font-light tracking-tight mb-2">Admin Access</h1>
                    <p className="text-gray-500 text-sm">
                        Enter the admin password to edit website content
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700">
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-3">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full p-4 bg-transparent border border-gray-300 focus:border-black outline-none transition-colors"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !password}
                        className="w-full py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Authenticating...' : 'Enter Admin Mode'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-8">
                    This page is only accessible to authorized administrators.
                </p>
            </div>
        </div>
    );
};

export default Admin;

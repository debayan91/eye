import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleLogin = () => {
        // Mock Google Login
        login({
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=000000&color=fff",
            provider: "google"
        });
        navigate(-1); // Go back
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock Email/Pass Login
        login({
            name: email.split('@')[0],
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
            provider: "email"
        });
        navigate(-1);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-light mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p className="text-gray-500 font-light">Sign in to track your queries and appointments.</p>
                </div>

                <div className="space-y-6">
                    <button
                        className="w-full py-3 border border-gray-300 flex items-center justify-center gap-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                        onClick={handleGoogleLogin}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" />
                        <span className="text-sm uppercase tracking-wider font-medium">Continue with Google</span>
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-widest">Or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                                <input type="text" placeholder="John Doe" required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent"
                            />
                        </div>
                        <button type="submit" className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest font-bold border border-black hover:bg-white hover:text-black transition-all duration-300">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            className="text-gray-500 hover:text-black text-xs uppercase tracking-widest underline underline-offset-4 transition-colors"
                            onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin) }}
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

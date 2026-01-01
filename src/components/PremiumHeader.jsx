import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Doctor Speaks', path: '/doctor-speaks' },
        { name: 'Lens Selection', path: '/lens-selection' },
        { name: 'Operations', path: '/eye-operations' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-white border-b border-black h-[80px] flex items-center">
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col leading-none group">
                        <span className="text-xl font-bold tracking-tighter uppercase group-hover:opacity-60 transition-opacity">
                            Dr. Debashis Dutta
                        </span>
                        <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
                            Ophthalmologist
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-xs uppercase tracking-widest font-medium hover:text-gray-500 transition-colors ${location.pathname === link.path ? 'text-black border-b border-black pb-1' : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="ml-4 px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
                        >
                            Book Appt
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-white flex flex-col"
                    >
                        <div className="h-[80px] flex items-center justify-between px-6 border-b border-black">
                            <span className="text-xl font-bold uppercase tracking-tighter">Menu</span>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col p-8 gap-6 overflow-y-auto">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-3xl font-light uppercase tracking-tight text-black border-b border-gray-100 pb-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;

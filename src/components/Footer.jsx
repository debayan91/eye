import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-gray-800">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-6">Dr. Debashis<br />Dutta</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Expert ophthalmology care with a focus on precision, technology, and patient well-being.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Navigation</h3>
                        <ul className="space-y-4">
                            {['Home', 'Doctor Speaks', 'Lens Selection', 'Eye Operations', 'Portfolio', 'FAQ'].map(item => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-sm hover:text-gray-400 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-1 shrink-0" />
                                <span>123 Medical Centre Drive,<br />Kolkata, West Bengal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} />
                                <span>contact@drdutta.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Social</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Dr. Debashis Dutta. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Designed & Developed with Precision.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

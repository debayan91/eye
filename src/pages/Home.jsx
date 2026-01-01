import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Glasses, Activity, Droplets, Palette, Stethoscope, ArrowRight } from 'lucide-react';

const Home = () => {
    const services = [
        { icon: Eye, title: "Cataract", desc: "Advanced Micro-Incision Phacoemulsification." },
        { icon: Glasses, title: "Refractive Surgery", desc: "LASIK, SMILE & ICL for freedom from glasses." },
        { icon: Activity, title: "Diabetic Retinopathy", desc: "Advanced screening and laser treatments." },
        { icon: Droplets, title: "Cornea", desc: "Transplants and infection management." },
        { icon: Palette, title: "Oculoplasty", desc: "Eyelid surgeries and cosmetic enhancements." },
        { icon: Stethoscope, title: "Glaucoma", desc: "Early detection and IOP management." },
    ];

    return (
        <div className="flex flex-col gap-24">

            {/* Split Hero */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 border-b border-black pb-24">
                <div className="flex flex-col justify-center lg:pr-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6"
                    >
                        Advanced Ophthalmology
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.9] mb-8"
                    >
                        Precision.<br />
                        <span className="font-bold">Clarity.</span><br />
                        <span className="italic font-serif">Vision.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 font-light max-w-md leading-relaxed mb-10"
                    >
                        Dr. Debashis Dutta brings world-class surgical expertise and compassionate care to help you see the world in its truest form.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-4"
                    >
                        <Link to="/contact" className="px-8 py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors">
                            Book Visit
                        </Link>
                        <Link to="/portfolio" className="px-8 py-4 border border-black text-black text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors">
                            About Doctor
                        </Link>
                    </motion.div>
                </div>

                <div className="relative aspect-[4/5] lg:aspect-auto h-full min-h-[500px] bg-gray-100 lg:border-l lg:border-black">
                    {/* Placeholder for Hero Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs uppercase tracking-widest text-gray-400">Hero Image Placeholder</span>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-black">
                    <h2 className="text-3xl font-light tracking-tight">Clinical Expertise</h2>
                    <Link to="/eye-operations" className="group flex items-center gap-2 text-xs uppercase tracking-widest font-bold mt-4 md:mt-0">
                        View All Procedures
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`group p-8 border-gray-200 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer
                                ${index % 3 !== 2 ? 'lg:border-r' : ''} 
                                ${index < 3 ? 'lg:border-b' : ''}
                                border-b lg:border-b-0
                                last:border-b-0
                            `}
                        >
                            <service.icon size={28} strokeWidth={1} className="mb-6 text-black group-hover:text-white transition-colors" />
                            <h3 className="text-lg font-bold uppercase tracking-wide mb-3">{service.title}</h3>
                            <p className="text-sm font-light text-gray-500 group-hover:text-gray-300 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA / Quote */}
            <section className="py-24 bg-gray-50 text-center px-4">
                <blockquote className="max-w-3xl mx-auto">
                    <p className="text-3xl md:text-5xl font-serif italic leading-tight mb-8">
                        "Vision is the art of seeing what is invisible to others."
                    </p>
                    <cite className="text-xs font-bold uppercase tracking-widest not-italic text-gray-500">
                        — Jonathan Swift
                    </cite>
                </blockquote>
            </section>

        </div>
    );
};

export default Home;

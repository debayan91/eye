import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const PremiumHero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-white text-black flex items-center justify-center">
            {/* Background Subtle Gradient/Noise could go here */}

            <motion.div
                style={{ y, opacity }}
                className="container relative z-10 flex flex-col items-center text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-6 text-gray-500">
                        Advanced Ophthalmology
                    </h2>
                </motion.div>

                <motion.h1
                    className="text-display mb-8 tracking-tighter"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    See The World<br />
                    <span className="font-thin italic">Clearly</span>
                </motion.h1>

                <motion.p
                    className="max-w-xl text-lg md:text-xl font-light text-gray-600 mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                >
                    Dr. Debashis Dutta specializes in cataract, cornea, and refractive surgeries, bringing clarity to your vision with state-of-the-art precision.
                </motion.p>

                <motion.div
                    className="flex flex-col md:flex-row gap-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                >
                    <Link to="/portfolio" className="btn-primary">
                        Meet Dr. Dutta
                    </Link>
                    <Link to="/doctor-speaks" className="btn-outline">
                        Watch Videos
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PremiumHero;

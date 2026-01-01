import { useState, useEffect, useRef } from 'react';
import {
    Eye, EyeOff, Activity, Award, ArrowRight, ChevronDown,
    Menu, Info, Glasses, Gamepad2, ShieldAlert, RotateCcw,
    Check, Mail, MapPin, Video, GraduationCap, Globe, Minus, Plus, Phone, X
} from 'lucide-react';

// Advanced scroll animation hook with multiple effects
const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Calculate how far into view the element is
                    const progress = Math.min(entry.intersectionRatio * 2, 1);
                    setScrollProgress(progress);
                }
            },
            { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], rootMargin: '-50px' }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, []);

    return { ref, isVisible, scrollProgress };
};

// Parallax effect hook
const useParallax = (speed = 0.5) => {
    const [offset, setOffset] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            setOffset(scrolled * speed * 0.1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
};

// Advanced animated component with multiple effects
const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    animation = 'fadeUp', // fadeUp, fadeLeft, fadeRight, scale, blur
    duration = 800
}) => {
    const { ref, isVisible } = useScrollAnimation();

    const animations = {
        fadeUp: {
            initial: { opacity: 0, transform: 'translateY(60px)' },
            animate: { opacity: 1, transform: 'translateY(0)' }
        },
        fadeLeft: {
            initial: { opacity: 0, transform: 'translateX(-60px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        fadeRight: {
            initial: { opacity: 0, transform: 'translateX(60px)' },
            animate: { opacity: 1, transform: 'translateX(0)' }
        },
        scale: {
            initial: { opacity: 0, transform: 'scale(0.8)' },
            animate: { opacity: 1, transform: 'scale(1)' }
        },
        blur: {
            initial: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(20px)' },
            animate: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' }
        }
    };

    const current = animations[animation] || animations.fadeUp;
    const style = isVisible ? current.animate : current.initial;

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            }}
        >
            {children}
        </div>
    );
};

// Stagger container for child animations
const StaggerContainer = ({ children, className = '', staggerDelay = 100 }) => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div ref={ref} className={className}>
            {Array.isArray(children) ? children.map((child, index) => (
                <div
                    key={index}
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`
                    }}
                >
                    {child}
                </div>
            )) : children}
        </div>
    );
};

const QRPage = () => {
    // Timer settings
    const [workDuration, setWorkDuration] = useState(20);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(workDuration * 60);
    const [mode, setMode] = useState('work');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [timerPulse, setTimerPulse] = useState(false);
    const timerRef = useRef(null);

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const totalTime = mode === 'work' ? workDuration * 60 : 20;
    const elapsed = totalTime - timeLeft;
    const percentage = (elapsed / totalTime) * 100;
    const strokeDashoffset = circumference - ((100 - percentage) / 100) * circumference;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!isRunning && mode === 'work') {
            setTimeLeft(workDuration * 60);
        }
    }, [workDuration, isRunning, mode]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
                // Pulse effect every second
                setTimerPulse(true);
                setTimeout(() => setTimerPulse(false), 200);
            }, 1000);
        } else if (timeLeft === 0) {
            if (mode === 'work') {
                setMode('rest');
                setTimeLeft(20);
            } else {
                setMode('work');
                setTimeLeft(workDuration * 60);
            }
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning, timeLeft, mode, workDuration]);

    const toggleTimer = () => setIsRunning(!isRunning);
    const resetTimer = () => {
        setIsRunning(false);
        setMode('work');
        setTimeLeft(workDuration * 60);
    };
    const getStatusText = () => {
        if (!isRunning) return timeLeft === workDuration * 60 ? 'Ready' : 'Paused';
        return mode === 'work' ? 'Focusing...' : 'REST YOUR EYES';
    };
    const adjustDuration = (delta) => {
        const newDuration = Math.max(5, Math.min(60, workDuration + delta));
        setWorkDuration(newDuration);
    };

    // Parallax for hero
    const { ref: heroRef, offset: heroOffset } = useParallax(0.3);

    return (
        <div className="bg-white text-slate-900 antialiased font-light overflow-x-hidden">
            {/* Animated Background Blobs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-sky-400/10 to-blue-500/5 rounded-full blur-[120px] animate-pulse"
                    style={{ animationDuration: '8s' }}
                />
                <div
                    className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] bg-gradient-to-bl from-blue-600/8 to-cyan-400/5 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDuration: '10s', animationDelay: '2s' }}
                />
                <div
                    className="absolute bottom-[-15%] left-[10%] w-[700px] h-[700px] bg-gradient-to-tr from-sky-300/8 to-indigo-400/5 rounded-full blur-[140px] animate-pulse"
                    style={{ animationDuration: '12s', animationDelay: '4s' }}
                />
            </div>

            {/* Navigation with Doctor Name */}
            <nav className="fixed w-full z-50 bg-transparent backdrop-blur-2xl ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-transparent rounded-xl shadow-md shadow-sky-500/30">
                                <Eye className="text-black w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-tight leading-tight">
                                    Dr. Debashis Dutta
                                </span>
                                <span className="text-xs text-slate-500 tracking-widest font-thin hidden sm:block">
                                    Ophthalmologist
                                </span>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="#symptoms" className="text-sm font-medium text-slate-500 hover:text-sky-600 transition-all hover:scale-105">Symptoms</a>
                            <a href="#risk-factors" className="text-sm font-medium text-slate-500 hover:text-sky-600 transition-all hover:scale-105">High Risk</a>
                            <a href="#prevention" className="text-sm font-medium text-slate-500 hover:text-sky-600 transition-all hover:scale-105">Protocol</a>
                            <a href="#tool" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25 flex items-center gap-2">
                                <span>20-20-20 Tool</span>
                                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-slate-500 hover:text-sky-600 transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={2} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-100 absolute w-full shadow-2xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                >
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        <a href="#symptoms" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all">Symptoms</a>
                        <a href="#risk-factors" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all">High Risk Groups</a>
                        <a href="#prevention" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-all">Prevention Protocol</a>
                        <a href="#tool" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 mt-4 text-center shadow-lg">Launch Tool</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Parallax */}
            <section ref={heroRef} className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden z-10">
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
                    style={{ transform: `translateY(${heroOffset}px)` }}
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimatedSection animation="scale" delay={0}>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 mb-8 cursor-pointer hover:shadow-lg hover:scale-105 transition-all">
                                <Award className="w-4 h-4 text-sky-600" strokeWidth={2} />
                                <span className="text-xs md:text-sm font-semibold text-sky-700 tracking-wide">Expert Content by Dr. Debashis Dutta</span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="blur" delay={100}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]">
                                Vision Care for the <br />
                                <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    Digital Era
                                </span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeUp" delay={200}>
                            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-light leading-relaxed px-4">
                                Prevent Digital Eye Strain (CVS) with science-backed protocols. Reduce headaches, fatigue, and blurriness without compromising your productivity.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeUp" delay={300}>
                            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 px-6">
                                <a
                                    href="#tool"
                                    className="group px-8 py-4 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-lg shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Start Therapy Tool
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                                <a
                                    href="#risk-factors"
                                    className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 font-bold shadow-lg border border-slate-100 hover:shadow-xl"
                                >
                                    View Risk Factors
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
                    <div className="animate-bounce text-slate-300 hover:text-sky-500 transition-colors cursor-pointer">
                        <ChevronDown className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                </div>
            </section>

            {/* Stats Section with Staggered Animation */}
            <section className="py-16 bg-gradient-to-b from-slate-50/80 to-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" staggerDelay={100}>
                        <div className="text-center group cursor-default">
                            <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-sky-600 group-hover:to-blue-600 transition-all duration-500">66%</div>
                            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">Less Blinking</div>
                        </div>
                        <div className="text-center group cursor-default">
                            <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-transparent">20<span className="text-2xl">ft</span></div>
                            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">Focus Distance</div>
                        </div>
                        <div className="text-center group cursor-default">
                            <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-sky-600 group-hover:to-blue-600 transition-all duration-500">25<span className="text-2xl">in</span></div>
                            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">Monitor Gap</div>
                        </div>
                        <div className="text-center group cursor-default">
                            <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">15°</div>
                            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-semibold">View Angle</div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* Symptoms Grid */}
            <section id="symptoms" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                        <div className="md:w-1/3">
                            <AnimatedSection animation="fadeLeft">
                                <div className="sticky top-32">
                                    <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-bold tracking-wider uppercase text-xs mb-4">Diagnosis</span>
                                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Recognizing <br />The Signals</h2>
                                    <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                                        Symptoms often manifest after just two hours of continuous screen use. Early detection prevents chronic issues.
                                    </p>
                                    <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-sky-100 rounded-lg">
                                                <Info className="w-5 h-5 text-sky-600" strokeWidth={2} />
                                            </div>
                                            <p className="text-sm text-slate-600 font-medium leading-relaxed">If these symptoms persist even after using the strategies below, please schedule a comprehensive exam.</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        <div className="md:w-2/3 space-y-6">
                            <AnimatedSection animation="fadeRight" delay={100}>
                                <div className="bg-white shadow-xl shadow-slate-200/50 p-6 md:p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-4 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl">
                                            <EyeOff className="w-8 h-8 text-sky-600" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-bold">Ocular Distress</h3>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            { title: 'Dryness & Grittiness', desc: 'Rapid tear evaporation due to lack of blinking.' },
                                            { title: 'Photophobia', desc: 'Increased sensitivity to ambient and screen light.' },
                                            { title: 'Blurred Vision', desc: 'Inability to lock focus on distant objects.' },
                                            { title: 'Redness', desc: 'Visible inflammation of the sclera.' }
                                        ].map((item, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-slate-50/50 hover:bg-sky-50 transition-colors group cursor-default">
                                                <span className="block font-bold mb-1 group-hover:text-sky-600 transition-colors">{item.title}</span>
                                                <span className="text-sm text-slate-500 font-light">{item.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="fadeRight" delay={200}>
                                <div className="bg-white shadow-xl shadow-slate-200/50 p-6 md:p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl">
                                            <Activity className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-2xl font-bold">Musculoskeletal</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            { title: 'Tension Headaches', desc: 'Concentrated in temples/forehead.' },
                                            { title: 'Neck Stiffness', desc: '"Tech neck" from forward head posture.' },
                                            { title: 'General Fatigue', desc: 'Systemic tiredness post-work.' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 hover:bg-blue-50 transition-colors group cursor-default">
                                                <div className="p-1.5 bg-blue-100 rounded-full">
                                                    <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                                                </div>
                                                <span className="text-slate-600 font-light"><strong className="font-semibold group-hover:text-blue-600 transition-colors">{item.title}:</strong> {item.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Risk Factors */}
            <section id="risk-factors" className="py-24 bg-gradient-to-b from-slate-50/50 to-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold tracking-wider uppercase text-xs mb-4">Vulnerable Groups</span>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Specific Risk Factors</h2>
                        <p className="text-slate-500 font-light text-lg">Certain activities and conditions require specialized care strategies.</p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatedSection animation="fadeLeft" delay={100}>
                            <div className="h-full bg-white shadow-xl shadow-slate-200/50 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl">
                                        <Glasses className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">Contact Lens Wearers</h3>
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold mt-1">High Risk</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 mb-6 font-light leading-relaxed">
                                    Contact lenses can act as a sponge, drying out significantly faster during screen use. Old "extended wear" habits can be damaging.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Switch to glasses during long work sessions.',
                                        'Never sleep in contacts, even if labeled "extended wear".',
                                        'Consider dedicated "Computer Glasses" tuned for 20-26 inch focus.'
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-light">
                                            <ShieldAlert className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="fadeRight" delay={200}>
                            <div className="h-full bg-white shadow-xl shadow-slate-200/50 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-4 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl">
                                        <Gamepad2 className="w-8 h-8 text-cyan-600" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">Gamers & VR Users</h3>
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mt-1">Intense Focus</span>
                                    </div>
                                </div>
                                <p className="text-slate-500 mb-6 font-light leading-relaxed">
                                    VR creates a "vergence-accommodation conflict" where eyes fight to focus on a screen that is close, while the image appears far.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Take breaks more frequently than standard monitor users.',
                                        'If you feel dizzy/nauseous, check depth perception with a doctor.',
                                        'Ensure VR IPD (Interpupillary Distance) is correctly calibrated.'
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-light">
                                            <ShieldAlert className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Interactive Timer Tool with Enhanced Animations */}
            <section id="tool" className="py-20 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-white z-0" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <AnimatedSection animation="scale">
                        <div className="bg-white shadow-2xl shadow-sky-200/30 max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 overflow-hidden relative border border-sky-100/50">
                            {/* Animated glow effects */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-400/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '3s' }} />

                            <div className="flex flex-col lg:flex-row items-center gap-12 relative">
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 text-xs font-bold mb-6 uppercase tracking-wider">Interactive Tool</span>
                                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">The 20-20-20 Rule</h2>
                                    <p className="text-lg text-slate-500 font-light mb-8 leading-relaxed">
                                        The gold standard for eye strain prevention. We've built this timer to help you build the habit.
                                    </p>
                                    <div className="flex flex-col gap-3 text-left">
                                        {[
                                            { num: 1, text: <>Every <strong>20 minutes</strong> of screen time</> },
                                            { num: 2, text: <>Look at something <strong>20 feet</strong> away</> },
                                            { num: 3, text: <>Hold focus for <strong>20 seconds</strong></> }
                                        ].map((step) => (
                                            <div key={step.num} className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-transparent p-4 rounded-xl group hover:from-sky-50 transition-colors">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                                                    {step.num}
                                                </div>
                                                <span className="text-slate-600 text-sm md:text-base font-light">{step.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-1/2 w-full flex flex-col items-center">
                                    {/* Animated Timer */}
                                    <div className={`relative w-64 h-64 md:w-80 md:h-80 mb-8 transition-transform duration-200 ${timerPulse ? 'scale-[1.02]' : 'scale-100'}`}>
                                        {/* Outer glow ring */}
                                        <div
                                            className={`absolute inset-0 rounded-full transition-all duration-500 ${isRunning
                                                    ? mode === 'work'
                                                        ? 'shadow-[0_0_60px_10px_rgba(14,165,233,0.3)]'
                                                        : 'shadow-[0_0_60px_10px_rgba(29,78,216,0.4)]'
                                                    : 'shadow-[0_0_30px_5px_rgba(14,165,233,0.1)]'
                                                }`}
                                        />

                                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                                            {/* Background track */}
                                            <circle
                                                cx="50" cy="50" r="45"
                                                stroke="rgba(0,0,0,0.05)"
                                                strokeWidth="6"
                                                fill="transparent"
                                            />
                                            {/* Animated gradient progress */}
                                            <circle
                                                cx="50" cy="50" r="45"
                                                stroke="url(#timerGradient)"
                                                strokeWidth="6"
                                                fill="transparent"
                                                strokeLinecap="round"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                className="transition-all duration-300 ease-out"
                                                style={{ filter: isRunning ? 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.5))' : 'none' }}
                                            />
                                            <defs>
                                                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor={mode === 'work' ? '#0ea5e9' : '#1d4ed8'} />
                                                    <stop offset="100%" stopColor={mode === 'work' ? '#3b82f6' : '#4f46e5'} />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                                            <span
                                                className={`text-5xl md:text-7xl font-black tracking-tighter tabular-nums transition-all duration-200 ${timerPulse ? 'scale-105' : 'scale-100'
                                                    } ${mode === 'rest' ? 'text-blue-700' : ''}`}
                                            >
                                                {formatTime(timeLeft)}
                                            </span>
                                            <span
                                                className={`text-sm font-bold tracking-widest mt-2 uppercase transition-all ${isRunning ? 'animate-pulse' : ''
                                                    } ${mode === 'work' ? 'text-sky-600' : 'text-blue-700'}`}
                                            >
                                                {getStatusText()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Duration Selector */}
                                    {!isRunning && mode === 'work' && (
                                        <div className="flex items-center gap-3 mb-6 bg-slate-50 rounded-2xl p-2 border border-slate-100">
                                            <button
                                                onClick={() => adjustDuration(-5)}
                                                className="w-12 h-12 rounded-xl bg-white shadow-sm hover:shadow-md flex items-center justify-center text-slate-500 hover:text-sky-600 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                                disabled={workDuration <= 5}
                                            >
                                                <Minus className="w-5 h-5" strokeWidth={2.5} />
                                            </button>
                                            <div className="w-24 text-center">
                                                <span className="text-3xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">{workDuration}</span>
                                                <span className="text-sm text-slate-400 ml-1 font-medium">min</span>
                                            </div>
                                            <button
                                                onClick={() => adjustDuration(5)}
                                                className="w-12 h-12 rounded-xl bg-white shadow-sm hover:shadow-md flex items-center justify-center text-slate-500 hover:text-sky-600 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                                disabled={workDuration >= 60}
                                            >
                                                <Plus className="w-5 h-5" strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex gap-3 w-full max-w-sm">
                                        <button
                                            onClick={toggleTimer}
                                            className={`flex-1 font-bold py-4 px-8 rounded-2xl transition-all duration-300 active:scale-95 ${isRunning
                                                    ? 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 shadow-sm'
                                                    : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 hover:scale-[1.02]'
                                                }`}
                                        >
                                            {isRunning ? 'Pause Timer' : (timeLeft === workDuration * 60 ? 'Start Timer' : 'Resume')}
                                        </button>
                                        <button
                                            onClick={resetTimer}
                                            className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all text-slate-500 hover:text-slate-700 hover:scale-105 active:scale-95"
                                        >
                                            <RotateCcw className="w-6 h-6" strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Prevention Checklist */}
            <section id="prevention" className="py-24 relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="fadeUp">
                        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Prevention Protocol</h2>
                    </AnimatedSection>

                    <StaggerContainer className="space-y-4" staggerDelay={100}>
                        {[
                            { num: 1, title: 'Monitor Position', color: 'sky', content: 'Distance is key. Keep the screen arm\'s length (20-28 inches) away. Crucially, position the top of the monitor at eyebrow level so you look slightly down (10-15°). This lowers the eyelid, reducing tear evaporation.' },
                            { num: 2, title: 'Environment Lighting', color: 'blue', content: 'Eliminate glare. Never place a screen directly in front of an uncovered window (backlighting) or directly opposite one (reflection). Use bias lighting (LED strip behind monitor) to equalize brightness.' },
                            { num: 3, title: 'Lubrication & Blinking', color: 'indigo', content: 'Blinking resets the eye\'s tear film. Force yourself to blink fully. If dryness persists, use artificial tears (preservative-free) to maintain moisture. Use a room humidifier if the air is dry.' },
                            { num: 4, title: 'Display Calibration', color: 'cyan', content: 'Use "Night Light" or f.lux after sunset to reduce blue light. Ensure text size is large enough to read from 3 feet away. Contrast should be high (60-70%), but brightness should match your room.' },
                        ].map((item) => (
                            <div key={item.num} className="group">
                                <div className={`bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl p-1 rounded-2xl transition-all duration-500 hover:-translate-y-1 border border-slate-100 hover:border-${item.color}-200`}>
                                    <div className="p-6 md:p-8 flex gap-6 items-start">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 flex items-center justify-center text-${item.color}-600 font-black text-xl shadow-sm flex-shrink-0`}>
                                            {item.num}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-xl md:text-2xl font-bold mb-3 group-hover:text-${item.color}-600 transition-colors`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-500 font-light leading-relaxed">{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Expert Bio Section */}
            <section id="expert-bio" className="py-24 relative z-10 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection animation="scale">
                        <div className="bg-white shadow-2xl shadow-slate-200/50 p-8 md:p-12 rounded-[2rem] relative overflow-hidden border border-slate-100">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-100/50 to-transparent rounded-full blur-[80px]" />

                            <div className="flex flex-col md:flex-row gap-10 items-center relative">
                                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-sky-500/30 shrink-0 ring-4 ring-white">
                                    <span className="text-5xl md:text-6xl font-black text-white">DD</span>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-3xl md:text-4xl font-black mb-2">Dr. Debashis Dutta</h2>
                                    <p className="text-sky-600 font-bold mb-6 uppercase tracking-wider text-sm">MBBS, MS (Ophthalmology)</p>

                                    <p className="text-slate-500 font-light leading-relaxed mb-8 text-lg">
                                        A renowned Consultant in Cataract and Cornea Services at <strong>Disha Eye Hospitals</strong> (since 2004). With over two decades of experience, Dr. Dutta has served both rural and urban populations, performing over 2,000 surgeries annually.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 font-light">
                                        {[
                                            { icon: Award, text: <>Winner of the <strong>K.R. Dutta Award</strong> & Best Poster Award at OSWB.</> },
                                            { icon: Video, text: <>ASCRS Film Festival Runner-up (New Orleans, 2016).</> },
                                            { icon: GraduationCap, text: <>Fellowships at <strong>Sankara Nethralaya</strong> (Retina) & <strong>LV Prasad Eye Institute</strong>.</> },
                                            { icon: Globe, text: <>Hands-on training at <strong>ORBIS International</strong>.</> }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                                    <item.icon className="w-4 h-4 text-blue-600" strokeWidth={2} />
                                                </div>
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Footer with Placeholder Contact Info */}
            <footer className="bg-slate-900 text-white pt-20 pb-10 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                        <div className="max-w-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
                                    <Eye className="text-white w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-2xl">Dr. Debashis Dutta</span>
                            </div>
                            <p className="text-slate-400 font-light leading-relaxed mb-6">
                                Empowering digital workers with the knowledge to protect their most valuable sense.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold text-lg">Contact Information</h4>
                            <p className="text-sm text-slate-400 font-light">For consultations and appointments:</p>
                            <div className="flex items-center gap-3 text-slate-300 font-light hover:text-sky-400 transition-colors">
                                <Mail className="w-4 h-4" strokeWidth={2} />
                                <a href="mailto:contact@example.com">contact@example.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300 font-light hover:text-sky-400 transition-colors">
                                <Phone className="w-4 h-4" strokeWidth={2} />
                                <a href="tel:+91XXXXXXXXXX">+91 XXXX XXXXXX</a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300 font-light">
                                <MapPin className="w-4 h-4" strokeWidth={2} />
                                <span>Kolkata, West Bengal, India</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-light">
                        <p>© 2024 Dr. Debashis Dutta. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span>Sources: AOA, Cleveland Clinic</span>
                            <span className="hidden md:inline">|</span>
                            <p>Disclaimer: Not a substitute for professional medical advice.</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Global Styles for Gradient Animation */}
            <style>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 6s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default QRPage;

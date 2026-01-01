import { useState, useEffect, useRef } from 'react';
import {
    Eye, EyeOff, Activity, Award, ArrowRight, ChevronDown,
    Menu, Info, Glasses, Gamepad2, ShieldAlert, RotateCcw,
    Check, Mail, MapPin, Video, GraduationCap, Globe, Minus, Plus, Phone, X
} from 'lucide-react';

// Advanced scroll animation hook
const useScrollAnimation = () => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: '-50px' }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, []);

    return { ref, isVisible };
};

// Animated component with elegant fade
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            }}
        >
            {children}
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

    return (
        <div className="bg-white text-black antialiased">
            {/* Navigation - Minimal Black & White */}
            <nav className="fixed w-full z-50 bg-white border-b border-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div className="flex items-center gap-4">
                            <Eye className="w-6 h-6" strokeWidth={1.5} />
                            <div className="flex flex-col">
                                <span className="font-light text-lg tracking-tight leading-tight">
                                    Dr. Debashis <span className="font-bold">Dutta</span>
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hidden sm:block">
                                    Ophthalmologist
                                </span>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#symptoms" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Symptoms</a>
                            <a href="#risk-factors" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">High Risk</a>
                            <a href="#prevention" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Protocol</a>
                            <a href="#tool" className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
                                20-20-20 Tool
                                <ArrowRight className="w-3 h-3" strokeWidth={2} />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-b border-black">
                        <div className="px-4 py-6 space-y-4">
                            <a href="#symptoms" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black">Symptoms</a>
                            <a href="#risk-factors" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black">High Risk</a>
                            <a href="#prevention" onClick={() => setMobileMenuOpen(false)} className="block text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black">Protocol</a>
                            <a href="#tool" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold text-center mt-4">Launch Tool</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section - Elegant Typography */}
            <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <AnimatedSection>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 block">
                                Digital Eye Health
                            </span>
                        </AnimatedSection>

                        <AnimatedSection delay={100}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] mb-8">
                                Vision Care<br />
                                for the <span className="font-bold">Digital</span><br />
                                <span className="italic font-serif">Era.</span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={200}>
                            <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl leading-relaxed mb-10">
                                Prevent Digital Eye Strain with science-backed protocols. Reduce headaches, fatigue, and blurriness without compromising your productivity.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={300}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#tool" className="px-8 py-4 bg-black text-white text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors">
                                    Start Therapy Tool
                                </a>
                                <a href="#risk-factors" className="px-8 py-4 border border-black text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors">
                                    View Risk Factors
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '66%', label: 'Less Blinking' },
                            { value: '20ft', label: 'Focus Distance' },
                            { value: '25in', label: 'Monitor Gap' },
                            { value: '15°', label: 'View Angle' }
                        ].map((stat, i) => (
                            <AnimatedSection key={i} delay={i * 100} className="text-center">
                                <div className="text-4xl md:text-5xl font-light tracking-tighter mb-2">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{stat.label}</div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Symptoms Grid */}
            <section id="symptoms" className="py-24 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/3">
                            <AnimatedSection>
                                <div className="lg:sticky lg:top-32">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Diagnosis</span>
                                    <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 leading-[0.9]">
                                        Recognizing<br /><span className="font-bold">The Signals</span>
                                    </h2>
                                    <p className="text-gray-600 font-light leading-relaxed mb-8">
                                        Symptoms often manifest after just two hours of continuous screen use. Early detection prevents chronic issues.
                                    </p>
                                    <div className="p-6 border border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                                            <p className="text-sm text-gray-600">If symptoms persist, schedule a comprehensive exam.</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        <div className="lg:w-2/3 space-y-8">
                            <AnimatedSection delay={100}>
                                <div className="border border-gray-200 p-8 hover:border-black transition-colors">
                                    <div className="flex items-center gap-4 mb-6">
                                        <EyeOff className="w-8 h-8" strokeWidth={1} />
                                        <h3 className="text-2xl font-light tracking-tight">Ocular <span className="font-bold">Distress</span></h3>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {[
                                            { title: 'Dryness & Grittiness', desc: 'Rapid tear evaporation due to lack of blinking.' },
                                            { title: 'Photophobia', desc: 'Increased sensitivity to ambient and screen light.' },
                                            { title: 'Blurred Vision', desc: 'Inability to lock focus on distant objects.' },
                                            { title: 'Redness', desc: 'Visible inflammation of the sclera.' }
                                        ].map((item, i) => (
                                            <div key={i} className="border-l-2 border-gray-200 pl-4 hover:border-black transition-colors">
                                                <span className="block font-bold text-sm mb-1">{item.title}</span>
                                                <span className="text-sm text-gray-500 font-light">{item.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={200}>
                                <div className="border border-gray-200 p-8 hover:border-black transition-colors">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Activity className="w-8 h-8" strokeWidth={1} />
                                        <h3 className="text-2xl font-light tracking-tight">Musculo<span className="font-bold">skeletal</span></h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {[
                                            { title: 'Tension Headaches', desc: 'Concentrated in temples/forehead.' },
                                            { title: 'Neck Stiffness', desc: '"Tech neck" from forward head posture.' },
                                            { title: 'General Fatigue', desc: 'Systemic tiredness post-work.' }
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                                <Check className="w-4 h-4 mt-1 flex-shrink-0" strokeWidth={2} />
                                                <span className="text-gray-600 font-light"><strong>{item.title}:</strong> {item.desc}</span>
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
            <section id="risk-factors" className="py-24 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Vulnerable Groups</span>
                        <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">Specific <span className="font-bold">Risk Factors</span></h2>
                        <p className="text-gray-600 font-light">Certain activities and conditions require specialized care strategies.</p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8">
                        <AnimatedSection delay={100}>
                            <div className="bg-white border border-gray-200 p-8 h-full hover:border-black transition-colors">
                                <div className="flex items-start gap-4 mb-6">
                                    <Glasses className="w-8 h-8" strokeWidth={1} />
                                    <div>
                                        <h3 className="text-xl font-light tracking-tight">Contact Lens <span className="font-bold">Wearers</span></h3>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">High Risk</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                    Contact lenses can dry out significantly faster during screen use. Extended wear habits can be damaging.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Switch to glasses during long work sessions.',
                                        'Never sleep in contacts, even if labeled "extended wear".',
                                        'Consider dedicated "Computer Glasses".'
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                                            <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={200}>
                            <div className="bg-white border border-gray-200 p-8 h-full hover:border-black transition-colors">
                                <div className="flex items-start gap-4 mb-6">
                                    <Gamepad2 className="w-8 h-8" strokeWidth={1} />
                                    <div>
                                        <h3 className="text-xl font-light tracking-tight">Gamers & <span className="font-bold">VR Users</span></h3>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Intense Focus</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-light mb-6 leading-relaxed">
                                    VR creates a "vergence-accommodation conflict" where eyes strain to focus correctly.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Take breaks more frequently than standard monitor users.',
                                        'If dizzy/nauseous, check depth perception with a doctor.',
                                        'Ensure VR IPD is correctly calibrated.'
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-light">
                                            <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Interactive Timer Tool */}
            <section id="tool" className="py-24 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="border border-black p-8 md:p-16">
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                                <div className="lg:w-1/2 text-center lg:text-left">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Interactive Tool</span>
                                    <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 leading-[0.9]">
                                        The <span className="font-bold">20-20-20</span><br />
                                        <span className="italic font-serif">Rule.</span>
                                    </h2>
                                    <p className="text-lg text-gray-600 font-light mb-8 leading-relaxed">
                                        The gold standard for eye strain prevention. We've built this timer to help you build the habit.
                                    </p>
                                    <div className="space-y-4 text-left">
                                        {[
                                            { num: 1, text: <>Every <strong>20 minutes</strong> of screen time</> },
                                            { num: 2, text: <>Look at something <strong>20 feet</strong> away</> },
                                            { num: 3, text: <>Hold focus for <strong>20 seconds</strong></> }
                                        ].map((step) => (
                                            <div key={step.num} className="flex items-center gap-4">
                                                <div className="w-10 h-10 border border-black flex items-center justify-center font-bold">
                                                    {step.num}
                                                </div>
                                                <span className="text-gray-600 font-light">{step.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-1/2 w-full flex flex-col items-center">
                                    {/* Timer Display */}
                                    <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
                                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="2" fill="transparent" />
                                            <circle
                                                cx="50" cy="50" r="45"
                                                stroke="black"
                                                strokeWidth="2"
                                                fill="transparent"
                                                strokeLinecap="round"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                className="transition-all duration-300"
                                            />
                                        </svg>

                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-5xl md:text-7xl font-light tracking-tighter tabular-nums">
                                                {formatTime(timeLeft)}
                                            </span>
                                            <span className={`text-xs uppercase tracking-[0.2em] font-bold mt-2 ${isRunning ? 'animate-pulse' : ''}`}>
                                                {getStatusText()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Duration Selector */}
                                    {!isRunning && mode === 'work' && (
                                        <div className="flex items-center gap-4 mb-6 border border-gray-200 p-2">
                                            <button
                                                onClick={() => adjustDuration(-5)}
                                                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30"
                                                disabled={workDuration <= 5}
                                            >
                                                <Minus className="w-4 h-4" strokeWidth={1.5} />
                                            </button>
                                            <div className="w-20 text-center">
                                                <span className="text-2xl font-light">{workDuration}</span>
                                                <span className="text-xs text-gray-500 ml-1">min</span>
                                            </div>
                                            <button
                                                onClick={() => adjustDuration(5)}
                                                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30"
                                                disabled={workDuration >= 60}
                                            >
                                                <Plus className="w-4 h-4" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        <button
                                            onClick={toggleTimer}
                                            className={`px-8 py-4 text-xs uppercase tracking-widest font-bold transition-colors ${isRunning
                                                    ? 'border border-black hover:bg-gray-100'
                                                    : 'bg-black text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            {isRunning ? 'Pause' : (timeLeft === workDuration * 60 ? 'Start Timer' : 'Resume')}
                                        </button>
                                        <button
                                            onClick={resetTimer}
                                            className="p-4 border border-gray-200 hover:border-black transition-colors"
                                        >
                                            <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Prevention Protocol */}
            <section id="prevention" className="py-24 border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-16 text-center">
                            Prevention <span className="font-bold">Protocol</span>
                        </h2>
                    </AnimatedSection>

                    <div className="space-y-6">
                        {[
                            { num: 1, title: 'Monitor Position', content: 'Keep the screen arm\'s length (20-28 inches) away. Position the top of the monitor at eyebrow level so you look slightly down (10-15°). This lowers the eyelid, reducing tear evaporation.' },
                            { num: 2, title: 'Environment Lighting', content: 'Eliminate glare. Never place a screen directly in front of an uncovered window or directly opposite one. Use bias lighting (LED strip behind monitor) to equalize brightness.' },
                            { num: 3, title: 'Lubrication & Blinking', content: 'Blinking resets the eye\'s tear film. Force yourself to blink fully. If dryness persists, use preservative-free artificial tears.' },
                            { num: 4, title: 'Display Calibration', content: 'Use "Night Light" after sunset to reduce blue light. Ensure text size is large enough to read from 3 feet away. Brightness should match your room.' },
                        ].map((item, i) => (
                            <AnimatedSection key={item.num} delay={i * 100}>
                                <div className="border border-gray-200 p-8 hover:border-black transition-colors group">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 border border-gray-200 group-hover:border-black group-hover:bg-black group-hover:text-white flex items-center justify-center font-bold text-xl transition-colors flex-shrink-0">
                                            {item.num}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                            <p className="text-gray-600 font-light leading-relaxed">{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expert Bio */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection>
                        <div className="bg-white border border-gray-200 p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="w-32 h-32 md:w-40 md:h-40 border border-black flex items-center justify-center flex-shrink-0">
                                    <span className="text-4xl md:text-5xl font-light">DD</span>
                                </div>

                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-light tracking-tighter mb-2">
                                        Dr. Debashis <span className="font-bold">Dutta</span>
                                    </h2>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">MBBS, MS (Ophthalmology)</p>

                                    <p className="text-gray-600 font-light leading-relaxed mb-6">
                                        A renowned Consultant in Cataract and Cornea Services at <strong>Disha Eye Hospitals</strong> since 2004. With over two decades of experience, Dr. Dutta performs over 2,000 surgeries annually.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 font-light">
                                        {[
                                            { icon: Award, text: 'K.R. Dutta Award & Best Poster at OSWB' },
                                            { icon: Video, text: 'ASCRS Film Festival Runner-up 2016' },
                                            { icon: GraduationCap, text: 'Fellowships at Sankara Nethralaya & LV Prasad' },
                                            { icon: Globe, text: 'Training at ORBIS International' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
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

            {/* Footer */}
            <footer className="bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                        <div className="max-w-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Eye className="w-6 h-6" strokeWidth={1.5} />
                                <span className="font-light text-xl">Dr. Debashis <span className="font-bold">Dutta</span></span>
                            </div>
                            <p className="text-gray-400 font-light leading-relaxed">
                                Empowering digital workers with the knowledge to protect their most valuable sense.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Contact</h4>
                            <div className="space-y-3 text-gray-400 font-light">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                                    <a href="mailto:contact@example.com" className="hover:text-white transition-colors">contact@example.com</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                                    <a href="tel:+91XXXXXXXXXX" className="hover:text-white transition-colors">+91 XXXX XXXXXX</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                                    <span>Kolkata, West Bengal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                        <p>© 2024 Dr. Debashis Dutta. All rights reserved.</p>
                        <p>Disclaimer: Not a substitute for professional medical advice.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default QRPage;

import { motion } from 'framer-motion';
import { Award, GraduationCap, Briefcase, Mail, Phone, Globe, BookOpen, Video } from 'lucide-react';

const Portfolio = () => {
    const education = [
        { year: '1987', institution: 'South Point School', qualification: 'Madhyamik', score: '74%' },
        { year: '1989', institution: 'South Point High School', qualification: 'Higher Secondary', score: '68%' },
        { year: '1994', institution: 'NRS Medical College, Calcutta', qualification: 'M.B.B.S', score: 'University of Calcutta' },
        { year: '2000', institution: 'MKCG Medical College, Berhampur', qualification: 'MS Ophthalmology', score: 'University of Berhampur' },
    ];

    const awards = [
        { title: 'K.R. Dutta Award', event: 'Best Paper at EIZOC', year: '2000' },
        { title: 'Best Poster Award', event: 'OSWB', year: '2010' },
        { title: 'ASCRS Film Festival Runners-up', event: 'Inhouse Category, New Orleans', year: '2016' },
        { title: 'Best Film Award', event: 'OSWB', year: '2016' },
    ];

    const affiliations = [
        { name: 'Disha Eye Hospitals', role: 'Consultant, Cataract & Cornea Services', period: '2004 – Present' },
        { name: 'M.N. Chatterjee Eye Hospital', role: 'Consultant', period: 'Previous' },
        { name: 'Smt. Sarla Phawa Memorial Eye Foundation', role: 'Consultant', period: 'Previous' },
        { name: 'Nihar Munsi Eye Foundation', role: 'Consultant', period: 'Previous' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Sidebar / Profile & Stats */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <div className="aspect-[3/4] bg-gray-100 w-full mb-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center border border-gray-200">
                        <span className="text-xs uppercase tracking-widest text-gray-400">Portrait</span>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <span className="block text-4xl font-bold mb-1">25+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
                    </div>
                    <div className="w-full h-px bg-gray-200" />
                    <div>
                        <span className="block text-4xl font-bold mb-1">40,000+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Surgeries Performed</span>
                    </div>
                    <div className="w-full h-px bg-gray-200" />
                    <div>
                        <span className="block text-4xl font-bold mb-1">2,000+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Surgeries Per Year</span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-12 pt-8 border-t border-gray-200 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Contact</h3>
                    <a href="mailto:contact@example.com" className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                        <Mail size={16} />
                        <span className="text-sm">contact@example.com</span>
                    </a>
                    <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
                        <Phone size={16} />
                        <span className="text-sm">+91 XXXX XXXXXX</span>
                    </a>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-16">

                {/* Header */}
                <header>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-6">
                        Consultant Ophthalmologist — Cataract & Cornea
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 leading-[0.9]">
                        Dr. Debashis<br />
                        <span className="font-bold">Dutta</span>
                    </h1>
                    <p className="text-lg text-gray-500 mb-2">
                        MBBS (University of Calcutta) • MS Ophthalmology (University of Berhampur)
                    </p>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl">
                        Dedicated to providing world-class eye care with precision and compassion.
                        Specializing in Micro-incision Phacoemulsification Cataract Surgery and advanced Refractive procedures.
                    </p>
                </header>

                {/* Biography */}
                <section className="prose prose-lg text-gray-600 font-light">
                    <p>
                        Dr. Debashis Dutta is a renowned ophthalmologist with over 25 years of experience in diagnosing and treating complex eye conditions. After completing his MS in Ophthalmology from MKCG Medical College, Berhampur in 2000, he dedicated himself to serving rural masses before joining Disha Eye Hospitals in 2004.
                    </p>
                    <p>
                        His advanced training includes hands-on experience at <strong>ORBIS International</strong>, observership at <strong>LV Prasad Eye Institute, Hyderabad</strong>, and the prestigious <strong>Carl Zeiss Medical Retina Fellowship at Sankara Nethralaya (2004)</strong>. Dr. Dutta performs over 2,000 cataract operations annually and is recognized as a pioneer in adopting the latest surgical technologies.
                    </p>
                    <p>
                        Beyond clinical practice, Dr. Dutta is an active researcher, having presented papers, posters, and videos at numerous national and international conferences including <strong>ASCRS (2012-2016)</strong> and <strong>ESCRS 2016</strong>. He regularly serves as guest faculty and conducts live surgery workshops at various CMEs.
                    </p>
                </section>

                {/* Education Timeline */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-black pb-4 flex items-center gap-2">
                        <GraduationCap size={16} />
                        Education
                    </h3>
                    <div className="space-y-6">
                        {education.map((item, index) => (
                            <div key={index} className="flex gap-6 items-start">
                                <span className="text-2xl font-bold text-gray-300 w-16 flex-shrink-0">{item.year}</span>
                                <div>
                                    <h4 className="font-bold text-lg">{item.qualification}</h4>
                                    <p className="text-gray-600">{item.institution}</p>
                                    <p className="text-sm text-gray-400">{item.score}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Awards & Recognition */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-black pb-4 flex items-center gap-2">
                        <Award size={16} />
                        Awards & Recognition
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {awards.map((award, index) => (
                            <div key={index} className="bg-gray-50 p-6 hover:bg-gray-100 transition-colors">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{award.year}</span>
                                <h4 className="font-bold text-lg mt-2">{award.title}</h4>
                                <p className="text-gray-600 text-sm">{award.event}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Publications */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-black pb-4 flex items-center gap-2">
                        <BookOpen size={16} />
                        Publications
                    </h3>
                    <div className="bg-gray-50 p-6">
                        <h4 className="font-bold">Bengal Journal of Ophthalmology, 2011</h4>
                        <p className="text-gray-600 italic mt-2">
                            "Score and conquer bone of any thickness and hardness by simple dental drill"
                        </p>
                    </div>
                    <p className="text-gray-500 mt-4 text-sm">
                        Numerous paper, poster, and video presentations at various national and international conferences including ASCRS, ESCRS, and state-level conferences.
                    </p>
                </section>

                {/* Professional Affiliations */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-8 border-b border-black pb-4 flex items-center gap-2">
                        <Briefcase size={16} />
                        Professional Affiliations
                    </h3>
                    <div className="space-y-4">
                        {affiliations.map((affiliation, index) => (
                            <div key={index} className={`flex justify-between items-start py-4 ${index !== affiliations.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <div>
                                    <h4 className="font-bold">{affiliation.name}</h4>
                                    <p className="text-gray-600 text-sm">{affiliation.role}</p>
                                </div>
                                <span className="text-xs uppercase tracking-wider text-gray-400 flex-shrink-0">{affiliation.period}</span>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Portfolio;

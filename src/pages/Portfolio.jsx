import { motion } from 'framer-motion';

const Portfolio = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Sidebar / Profile Image Area */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                <div className="aspect-[3/4] bg-gray-100 w-full mb-8 relative">
                    <div className="absolute inset-0 flex items-center justify-center border border-gray-200">
                        <span className="text-xs uppercase tracking-widest text-gray-400">Portrait</span>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <span className="block text-4xl font-bold mb-1">15+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
                    </div>
                    <div className="w-full h-px bg-gray-200" />
                    <div>
                        <span className="block text-4xl font-bold mb-1">10k+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Surgeries Performed</span>
                    </div>
                    <div className="w-full h-px bg-gray-200" />
                    <div>
                        <span className="block text-4xl font-bold mb-1">50+</span>
                        <span className="text-xs uppercase tracking-widest text-gray-500">Research Papers</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-16">

                {/* Header */}
                <header>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-6">
                        Senior Consultant Ophthalmologist
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 leading-[0.9]">
                        Dr. Debashis<br />
                        <span className="font-bold">Dutta</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl">
                        Dedicated to providing world-class eye care with precision and compassion. Specializing in Micro-incision Cataract Surgery and Refractive procedures.
                    </p>
                </header>

                {/* Biography */}
                <section className="prose prose-lg text-gray-600 font-light">
                    <p>
                        Dr. Dutta is a renowned Ophthalmologist with over 15 years of experience in diagnosing and treating complex eye conditions. He completed his medical training at top-tier institutions and has been a pioneer in adopting the latest surgical technologies.
                    </p>
                    <p>
                        His philosophy is rooted in patient-centric care, ensuring that every individual receives a personalized treatment plan. Beyond his clinical practice, Dr. Dutta is an active researcher and has published numerous papers in national and international journals.
                    </p>
                </section>

                {/* Testimonials */}
                <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-12 border-b border-black pb-4">Patient Stories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8">
                            <p className="italic text-lg mb-6">"I can finally see clearly again! The cataract surgery was painless and quick. Dr. Dutta explained everything so well."</p>
                            <cite className="text-xs font-bold uppercase tracking-widest not-italic">— Sarah Jenkins</cite>
                        </div>
                        <div className="bg-gray-50 p-8">
                            <p className="italic text-lg mb-6">"My LASIK experience was fantastic. From the initial consultation to the post-op care, the entire team was professional."</p>
                            <cite className="text-xs font-bold uppercase tracking-widest not-italic">— Rahul Verma</cite>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Portfolio;

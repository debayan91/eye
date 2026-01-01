import { useParams, Link } from 'react-router-dom';
import { operations } from '../data/operations';
import { videos } from '../data/videos';
import { ArrowLeft, CheckCircle, HelpCircle, Clock, Play } from 'lucide-react';
import { useState } from 'react';

const OperationDetail = () => {
    const { slug } = useParams();
    const operation = operations.find(op => op.slug === slug);
    const [openFaq, setOpenFaq] = useState(null);

    if (!operation) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Operation not found</h1>
                <Link to="/eye-operations" className="text-blue-600 hover:underline">
                    ← Back to Procedures
                </Link>
            </div>
        );
    }

    const relatedVideoData = operation.relatedVideos
        .map(id => videos.find(v => v.id === id))
        .filter(Boolean);

    return (
        <div className="max-w-5xl mx-auto">
            {/* Back Nav */}
            <Link to="/eye-operations" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={14} /> Back to Procedures
            </Link>

            {/* Hero */}
            <header className="mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block">
                    {operation.subtitle}
                </span>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
                    {operation.title}
                </h1>
                <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
                    {operation.heroDescription}
                </p>
            </header>

            {/* Overview */}
            <section className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-4 border-b border-black">
                    Overview
                </h2>
                <div className="prose prose-lg text-gray-600 font-light max-w-none">
                    {operation.overview.split('\n\n').map((para, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                </div>
            </section>

            {/* Procedure Steps */}
            <section className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-4 border-b border-black">
                    The Procedure
                </h2>
                <div className="space-y-6">
                    {operation.procedureSteps.map((step) => (
                        <div key={step.step} className="flex gap-6 items-start">
                            <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 text-lg font-bold">
                                {step.step}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recovery */}
            <section className="mb-16 bg-gray-50 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                    <Clock size={20} />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Recovery</h2>
                </div>
                <p className="text-lg text-gray-700 mb-6 font-light">{operation.recovery.timeline}</p>
                <h3 className="font-bold mb-4">Post-operative Instructions:</h3>
                <ul className="space-y-3">
                    {operation.recovery.instructions.map((instruction, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{instruction}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* FAQs */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black">
                    <HelpCircle size={20} />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {operation.faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-200">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-bold pr-4">{faq.question}</span>
                                <span className="text-2xl text-gray-400">{openFaq === i ? '−' : '+'}</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-6 pb-6 text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Videos */}
            {relatedVideoData.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-6 pb-4 border-b border-black">
                        Related Videos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedVideoData.map((video) => (
                            <Link
                                key={video.id}
                                to={`/doctor-speaks/${video.id}`}
                                className="group"
                            >
                                <div className="aspect-video bg-gray-100 mb-3 relative overflow-hidden">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                        <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full">
                                            <Play className="ml-0.5 w-4 h-4" fill="black" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-bold text-sm group-hover:underline">{video.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-black text-white p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-light mb-4">Ready to Learn More?</h2>
                <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                    Schedule a consultation with Dr. Dutta to discuss your specific needs and treatment options.
                </p>
                <a
                    href="tel:+91XXXXXXXXXX"
                    className="inline-block px-8 py-3 border border-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors"
                >
                    Contact Us
                </a>
            </section>
        </div>
    );
};

export default OperationDetail;

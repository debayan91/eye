import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is the recovery time for cataract surgery?",
        answer: "Most patients experience improved vision within 24-48 hours. Complete healing typically takes 4-6 weeks, but you can resume normal activities within a few days."
    },
    {
        question: "Is LASIK surgery painful?",
        answer: "No, the procedure is virtually painless. Numbing drops are used, and you may feel slight pressure for a few seconds. The entire process takes about 10-15 minutes per eye."
    },
    {
        question: "How do I know which IOL is right for me?",
        answer: "During your consultation, we perform advanced biometry tests and discuss your lifestyle needs to recommend whether a Monofocal, Multifocal, or Toric lens is best for you."
    },
    {
        question: "Do you accept health insurance?",
        answer: "Yes, we are empanelled with most major TPA and insurance providers. Our desk will assist you with the cashless authorization process."
    },
    {
        question: "How often should I get my eyes checked?",
        answer: "For healthy adults, every 1-2 years. If you have diabetes, glaucoma, or are over 60, an annual comprehensive eye exam is recommended."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
            <header className="text-center">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Help Center</span>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-8">Frequently Asked Questions</h1>
                <p className="text-gray-600 font-light max-w-xl mx-auto">
                    Find answers to common questions about our procedures, recovery, and clinic policies.
                </p>
            </header>

            <div className="border-t border-black">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b border-gray-200">
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full py-8 flex justify-between items-center text-left hover:bg-gray-50 transition-colors px-4"
                        >
                            <span className="text-lg md:text-xl font-light">{item.question}</span>
                            {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 px-4 text-gray-600 font-light leading-relaxed max-w-2xl">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 p-12 text-center mt-12">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-8 font-light">
                    Our support team is here to help you with any specific queries.
                </p>
                <a href="mailto:contact@drdutta.com" className="inline-block px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors">
                    Contact Support
                </a>
            </div>
        </div>
    );
};

export default FAQ;

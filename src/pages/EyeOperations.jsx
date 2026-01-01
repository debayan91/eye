import { ArrowRight } from 'lucide-react';

const operations = [
    {
        title: "Cataract Surgery",
        subtitle: "MICS (Micro-Incision Cataract Surgery)",
        desc: "A safe, minimally invasive procedure replacing the cloudy natural lens with an artificial IOL."
    },
    {
        title: "LASIK & SMILE",
        subtitle: "Refractive Vision Correction",
        desc: "Laser procedures to reshape the cornea and correct myopia, hyperopia, and astigmatism."
    },
    {
        title: "Glaucoma Therapy",
        subtitle: "MIGS & Trabeculectomy",
        desc: "Advanced medical and surgical interventions to lower eye pressure and prevent optic nerve damage."
    },
    {
        title: "Corneal Transplant",
        subtitle: "Keratoplasty (PK, DALK, DSAEK)",
        desc: "Replacing damaged corneal tissue with healthy donor tissue to restore vision."
    },
    {
        title: "Oculoplasty",
        subtitle: "Eyelid & Orbital Surgery",
        desc: "Cosmetic and reconstructive surgeries for eyelids, tear ducts, and the eye socket."
    },
    {
        title: "Retina Services",
        subtitle: "Medical & Surgical Retina",
        desc: "Management of diabetic retinopathy, retinal detachment, and macular degeneration."
    }
];

const EyeOperations = () => {
    return (
        <div className="flex flex-col gap-16">
            <header className="border-b border-black pb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Surgical Excellence</span>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter">Procedures</h1>
            </header>

            <div className="grid grid-cols-1 gap-px bg-gray-200 border border-gray-200">
                {operations.map((op, i) => (
                    <div key={i} className="bg-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold uppercase tracking-wide mb-2 group-hover:text-black transition-colors">{op.title}</h2>
                            <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">{op.subtitle}</p>
                            <p className="text-gray-600 font-light leading-relaxed max-w-2xl">{op.desc}</p>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full group-hover:bg-black group-hover:border-black transition-all">
                            <ArrowRight size={20} className="text-gray-400 group-hover:text-white" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EyeOperations;

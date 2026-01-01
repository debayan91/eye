import { motion } from 'framer-motion';
import { Target, Layers, Activity, Glasses, ArrowRight } from 'lucide-react';

const lensTypes = [
    {
        id: 'monofocal',
        name: "Monofocal IOL",
        tagline: "Standard clarity for distance.",
        description: "The most common type of lens used in cataract surgery. It provides excellent vision at one specific distance (usually far), requiring reading glasses for near tasks.",
        features: ["High-quality distance vision", "Covered by most insurance", "Sharp contrast"],
        icon: Target
    },
    {
        id: 'multifocal',
        name: "Multifocal IOL",
        tagline: "Freedom at all distances.",
        description: "Designed with multiple focal points to allow you to see clearly at near, intermediate, and far distances, significantly reducing dependence on glasses.",
        features: ["Near, Intermediate & Far vision", "Reduced glasses dependence", "Advanced light diffraction"],
        icon: Layers
    },
    {
        id: 'toric',
        name: "Toric IOL",
        tagline: "Astigmatism correction.",
        description: "Custom-engineered to correct corneal astigmatism, sharpening your vision without the need for thick cylindrical glasses.",
        features: ["Corrects astigmatism", "Available in Monofocal/Multifocal", "Precise alignment axis"],
        icon: Glasses
    },
    {
        id: 'edof',
        name: "EDOF IOL",
        tagline: "Extended depth of focus.",
        description: "A newer technology that creates a continuous range of high-quality vision from far to intermediate, offering a seamless visual experience.",
        features: ["Seamless range of vision", "Less glare/halos than multifocals", "Great for computer work"],
        icon: Activity
    }
];

const LensSelection = () => {
    return (
        <div className="flex flex-col gap-16">
            <header className="border-b border-black pb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Premium IOLs</span>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter">Lens Selection</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {lensTypes.map((lens, i) => (
                    <div key={lens.id} className="border border-gray-200 p-8 md:p-12 hover:border-black transition-colors group">
                        <div className="mb-8 flex justify-between items-start">
                            <lens.icon size={32} strokeWidth={1} className="text-gray-400 group-hover:text-black transition-colors" />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300 group-hover:text-black">0{i + 1}</span>
                        </div>

                        <h2 className="text-2xl font-bold uppercase tracking-wide mb-2">{lens.name}</h2>
                        <p className="text-sm font-serif italic text-gray-500 mb-6">{lens.tagline}</p>
                        <p className="text-gray-600 font-light leading-relaxed mb-8 min-h-[80px]">
                            {lens.description}
                        </p>

                        <ul className="space-y-4 pt-8 border-t border-gray-100">
                            {lens.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-gray-500">
                                    <ArrowRight size={12} className="text-black" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LensSelection;

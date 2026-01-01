import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { videos, allTags } from '../data/videos';
import { Play } from 'lucide-react';

const DoctorSpeaks = () => {
    const [selectedTag, setSelectedTag] = useState("All");

    const filteredVideos = selectedTag === "All"
        ? videos
        : videos.filter(v => v.tags.includes(selectedTag));

    return (
        <div className="flex flex-col gap-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-black pb-8 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-4">Doctor Speaks</h1>
                    <p className="text-gray-500 max-w-md">
                        Expert insights, procedure explanations, and patient education directly from Dr. Dutta.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all
                                ${selectedTag === tag
                                    ? 'bg-black text-white border-black'
                                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'}
                            `}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
                <AnimatePresence>
                    {filteredVideos.map((video) => (
                        <motion.article
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            key={video.id}
                            className="group cursor-pointer flex flex-col gap-4"
                        >
                            <Link to={`/doctor-speaks/${video.id}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full shadow-lg">
                                        <Play className="ml-1 w-5 h-5 text-black" fill="black" />
                                    </div>
                                </div>
                            </Link>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{video.date}</span>
                                    <div className="flex gap-2">
                                        {video.tags.slice(0, 1).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-widest text-black border border-gray-200 px-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4">
                                    <Link to={`/doctor-speaks/${video.id}`}>{video.title}</Link>
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {video.description}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

        </div>
    );
};

export default DoctorSpeaks;

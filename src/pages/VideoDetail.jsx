import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { videos } from '../data/videos';
import { getComments, addComment, submitQuestion } from '../utils/mockStorage';
import { ArrowLeft } from 'lucide-react';

const VideoDetail = () => {
    const { id } = useParams();
    const video = videos.find(v => v.id === id);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [question, setQuestion] = useState("");
    const [questionStatus, setQuestionStatus] = useState(null);

    useEffect(() => {
        if (video) {
            setComments(getComments(video.id));
        }
    }, [video]);

    if (!video) return <div>Video not found.</div>;

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const updated = addComment(video.id, { text: newComment, user: "User" });
        setComments(updated);
        setNewComment("");
    };

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        submitQuestion({ videoId: video.id, videoTitle: video.title, question: question });
        setQuestionStatus("Question sent.");
        setQuestion("");
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Nav */}
            <Link to="/doctor-speaks" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={14} /> Back to Library
            </Link>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black mb-12">
                <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Info */}
                <div className="lg:col-span-8">
                    <div className="mb-8 border-b border-black pb-8">
                        <div className="flex gap-4 mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-black border border-black px-2 py-1">{video.tags[0]}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 py-1">{video.date}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-6">{video.title}</h1>
                        <p className="text-lg text-gray-600 font-light leading-relaxed">{video.description}</p>
                    </div>

                    {/* Comments */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Comments ({comments.length})</h3>
                        <div className="space-y-8 mb-8">
                            {comments.map(c => (
                                <div key={c.id} className="bg-gray-50 p-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-xs uppercase">{c.user}</span>
                                        <span className="text-gray-400 text-[10px] uppercase">{c.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{c.text}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full p-4 bg-transparent border border-gray-300 focus:border-black outline-none text-sm min-h-[100px]"
                            ></textarea>
                            <button type="submit" className="mt-2 px-6 py-2 bg-black text-white text-xs uppercase tracking-widest font-bold">Post</button>
                        </form>
                    </div>
                </div>

                {/* Sidebar / Q&A */}
                <aside className="lg:col-span-4">
                    <div className="bg-gray-50 p-8 sticky top-32">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Ask Dr. Dutta</h3>
                        <p className="text-xs text-gray-500 mb-6">Private questions sent directly to the clinic.</p>

                        {questionStatus && <div className="p-2 bg-black text-white text-xs mb-4">{questionStatus}</div>}

                        <form onSubmit={handleQuestionSubmit} className="flex flex-col gap-4">
                            <textarea
                                placeholder="Your question..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 focus:border-black outline-none text-sm min-h-[120px]"
                            ></textarea>
                            <button type="submit" className="px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
                                Send Question
                            </button>
                        </form>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default VideoDetail;

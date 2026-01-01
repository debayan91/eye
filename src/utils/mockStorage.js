// Simple mock backend using localStorage

export const getComments = (videoId) => {
    const comments = localStorage.getItem(`comments_${videoId}`);
    return comments ? JSON.parse(comments) : [];
};

export const addComment = (videoId, comment) => {
    const comments = getComments(videoId);
    const newComment = {
        id: Date.now(),
        text: comment.text,
        user: comment.user || "Anonymous",
        date: new Date().toLocaleDateString()
    };
    const updatedComments = [newComment, ...comments];
    localStorage.setItem(`comments_${videoId}`, JSON.stringify(updatedComments));
    return updatedComments;
};

export const submitQuestion = (question) => {
    // In a real app, this would API call. Here we just log it or store for "my questions"
    const questions = JSON.parse(localStorage.getItem('questions') || '[]');
    const newQuestion = {
        id: Date.now(),
        ...question,
        status: 'Pending', // Sent to doctor
        date: new Date().toLocaleDateString()
    };
    localStorage.setItem('questions', JSON.stringify([newQuestion, ...questions]));
    return true; // Success
};

export const getMyQuestions = () => {
    return JSON.parse(localStorage.getItem('questions') || '[]');
};

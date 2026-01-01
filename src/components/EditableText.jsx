import { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * EditableText - Wraps text content to make it editable in admin mode
 * 
 * @param {string} contentId - Unique identifier for this content block (e.g., "home-hero-title")
 * @param {string} defaultContent - Default content to show if no saved content exists
 * @param {string} as - HTML element to render (default: 'span')
 * @param {string} className - CSS classes to apply
 * @param {boolean} multiline - Allow multiline editing (uses textarea)
 * @param {boolean} richText - Enable rich text editing (future feature)
 */
const EditableText = ({
    contentId,
    defaultContent = '',
    as: Component = 'span',
    className = '',
    multiline = false,
    children,
    ...props
}) => {
    const { isAdmin, isEditing } = useAdmin();
    const [content, setContent] = useState(defaultContent);
    const [isEditingThis, setIsEditingThis] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // 'saved', 'error', null
    const inputRef = useRef(null);
    const originalContent = useRef(defaultContent);

    // Load content from Supabase on mount
    useEffect(() => {
        const loadContent = async () => {
            if (!isSupabaseConfigured() || !contentId) return;

            try {
                const { data, error } = await supabase
                    .from('content_blocks')
                    .select('content')
                    .eq('block_id', contentId)
                    .single();

                if (data && !error) {
                    setContent(data.content);
                    originalContent.current = data.content;
                }
            } catch (err) {
                // Content doesn't exist yet, use default
                console.log(`No saved content for ${contentId}, using default`);
            }
        };

        loadContent();
    }, [contentId]);

    // Focus input when editing starts
    useEffect(() => {
        if (isEditingThis && inputRef.current) {
            inputRef.current.focus();
            // Place cursor at end
            if (inputRef.current.setSelectionRange) {
                const len = inputRef.current.value.length;
                inputRef.current.setSelectionRange(len, len);
            }
        }
    }, [isEditingThis]);

    const saveContent = async () => {
        if (!isSupabaseConfigured()) {
            // Fallback: save to localStorage if Supabase not configured
            localStorage.setItem(`content_${contentId}`, content);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(null), 2000);
            return;
        }

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('content_blocks')
                .upsert({
                    block_id: contentId,
                    content: content,
                    content_type: 'text',
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'block_id'
                });

            if (error) throw error;

            originalContent.current = content;
            setSaveStatus('saved');
        } catch (err) {
            console.error('Save error:', err);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveStatus(null), 2000);
        }
    };

    const handleBlur = () => {
        setIsEditingThis(false);
        if (content !== originalContent.current) {
            saveContent();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setContent(originalContent.current);
            setIsEditingThis(false);
        }
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            inputRef.current?.blur();
        }
    };

    // If not in admin mode or not editing, render normally
    if (!isAdmin || !isEditing) {
        return (
            <Component className={className} {...props}>
                {content || children || defaultContent}
            </Component>
        );
    }

    // Admin edit mode
    return (
        <div className="relative inline-block group">
            {isEditingThis ? (
                multiline ? (
                    <textarea
                        ref={inputRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className={`${className} bg-yellow-50 border-2 border-yellow-400 outline-none p-1 min-w-[100px] min-h-[60px] resize-both`}
                        style={{ font: 'inherit', lineHeight: 'inherit' }}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className={`${className} bg-yellow-50 border-2 border-yellow-400 outline-none p-1 min-w-[100px]`}
                        style={{ font: 'inherit', lineHeight: 'inherit', width: `${Math.max(content.length, 10)}ch` }}
                    />
                )
            ) : (
                <Component
                    className={`${className} cursor-pointer hover:bg-yellow-100 border-2 border-dashed border-transparent hover:border-yellow-400 transition-all`}
                    onClick={() => setIsEditingThis(true)}
                    title="Click to edit"
                    {...props}
                >
                    {content || children || defaultContent}
                </Component>
            )}

            {/* Save status indicator */}
            {saveStatus && (
                <span className={`absolute -top-6 left-0 text-xs px-2 py-1 ${saveStatus === 'saved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {saveStatus === 'saved' ? '✓ Saved' : '✗ Error'}
                </span>
            )}

            {/* Saving indicator */}
            {isSaving && (
                <span className="absolute -top-6 left-0 text-xs px-2 py-1 bg-blue-500 text-white">
                    Saving...
                </span>
            )}
        </div>
    );
};

export default EditableText;

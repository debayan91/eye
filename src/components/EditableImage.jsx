import { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

/**
 * EditableImage - Allows image upload and editing in admin mode
 * 
 * @param {string} contentId - Unique identifier for this image block
 * @param {string} defaultSrc - Default image source
 * @param {string} alt - Alt text for the image
 * @param {string} className - CSS classes to apply
 */
const EditableImage = ({
    contentId,
    defaultSrc = '',
    alt = 'Image',
    className = '',
    ...props
}) => {
    const { isAdmin, isEditing } = useAdmin();
    const [imageSrc, setImageSrc] = useState(defaultSrc);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image must be less than 5MB');
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        try {
            if (isSupabaseConfigured()) {
                // Upload to Supabase Storage
                const fileName = `${contentId}_${Date.now()}.${file.name.split('.').pop()}`;
                const { data, error } = await supabase.storage
                    .from('images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (error) throw error;

                // Get public URL
                const { data: urlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(fileName);

                const publicUrl = urlData.publicUrl;
                setImageSrc(publicUrl);

                // Save to content_blocks
                await supabase
                    .from('content_blocks')
                    .upsert({
                        block_id: contentId,
                        content: publicUrl,
                        content_type: 'image',
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: 'block_id'
                    });
            } else {
                // Fallback: use local data URL
                const reader = new FileReader();
                reader.onload = (e) => {
                    const dataUrl = e.target.result;
                    setImageSrc(dataUrl);
                    localStorage.setItem(`content_${contentId}`, dataUrl);
                };
                reader.readAsDataURL(file);
            }
        } catch (err) {
            console.error('Upload error:', err);
            setUploadError('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = async () => {
        setImageSrc('');
        if (isSupabaseConfigured()) {
            await supabase
                .from('content_blocks')
                .delete()
                .eq('block_id', contentId);
        } else {
            localStorage.removeItem(`content_${contentId}`);
        }
    };

    // If not in admin mode, render image normally
    if (!isAdmin || !isEditing) {
        if (!imageSrc) return null;
        return (
            <img
                src={imageSrc}
                alt={alt}
                className={className}
                {...props}
            />
        );
    }

    // Admin edit mode
    return (
        <div className="relative group">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {imageSrc ? (
                <div className="relative">
                    <img
                        src={imageSrc}
                        alt={alt}
                        className={`${className} border-2 border-dashed border-yellow-400`}
                        {...props}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-3 bg-white text-black rounded-full hover:bg-gray-100"
                            title="Replace image"
                        >
                            <Upload size={20} />
                        </button>
                        <button
                            onClick={handleRemove}
                            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                            title="Remove image"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className={`${className} min-h-[120px] min-w-[200px] border-2 border-dashed border-yellow-400 bg-yellow-50 hover:bg-yellow-100 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer`}
                >
                    {isUploading ? (
                        <span className="text-sm text-gray-600">Uploading...</span>
                    ) : (
                        <>
                            <ImageIcon size={32} className="text-gray-400" />
                            <span className="text-sm text-gray-600">Click to add image</span>
                        </>
                    )}
                </button>
            )}

            {uploadError && (
                <div className="absolute -bottom-8 left-0 text-xs text-red-500 bg-red-50 px-2 py-1">
                    {uploadError}
                </div>
            )}
        </div>
    );
};

export default EditableImage;

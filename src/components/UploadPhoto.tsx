import { useCallback, useRef, useState } from 'react';
import { uploadImage } from '../lib/supabaseClient';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UploadPhotoProps {
  bucket?: string;
  folder?: string;
  onUploaded?: (url: string) => void;
}

export default function UploadPhoto({ bucket = 'images', folder = 'posts', onUploaded }: UploadPhotoProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setError(null);
    setFilePreview(URL.createObjectURL(file));

    try {
      setIsUploading(true);
      const publicUrl = await uploadImage(file, { bucket, folder });
      onUploaded?.(publicUrl);
    } catch (err: any) {
      console.error('Upload error', err);
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [bucket, folder, onUploaded]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const onSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  return (
    <div>
      <label
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/40 hover:bg-black/30 transition"
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onSelect} />

        {!filePreview && (
          <div className="text-center text-slate-300">
            <div className="mb-2">Drag and drop photos here</div>
            <div className="text-sm">or click to browse</div>
          </div>
        )}

        {filePreview && (
          <div className="w-full max-w-xl">
            <div className="mb-3 text-slate-300 text-sm">Preview</div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <ImageWithFallback src={filePreview} alt="Preview" className="w-full h-64 object-cover" />
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-slate-400">
          {isUploading ? 'Uploading…' : error ? `Error: ${error}` : 'Supported: JPG, PNG, WEBP'}
        </div>
      </label>
    </div>
  );
}

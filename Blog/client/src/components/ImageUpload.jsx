import React, { useState } from 'react';
import { Button, FileInput, Alert } from 'flowbite-react';

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return setUploadError('Please select an image.');
    setUploadError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      setImageURL(data.url);
    } catch (err) {
      console.error(err);
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='p-3 max-w-md mx-auto'>
      <FileInput onChange={(e) => setFile(e.target.files[0])} />
      <Button onClick={handleUpload} disabled={uploading} className='mt-4'>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      {uploadError && <Alert color='failure'>{uploadError}</Alert>}
      {imageURL && (
        <img src={imageURL} alt='Uploaded' className='mt-4 w-full h-64 object-cover rounded' />
      )}
    </div>
  );
}
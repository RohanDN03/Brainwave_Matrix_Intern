// import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import { useEffect, useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function UpdatePost() {
//   const [file, setFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);
//   const { postId } = useParams();

//   const navigate = useNavigate();
//     const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     try {
//       const fetchPost = async () => {
//         const res = await fetch(`/api/post/getposts?postId=${postId}`);
//         const data = await res.json();
//         if (!res.ok) {
//           console.log(data.message);
//           setPublishError(data.message);
//           return;
//         }
//         if (res.ok) {
//           setPublishError(null);
//           setFormData(data.posts[0]);
//         }
//       };

//       fetchPost();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }, [postId]);

//   const handleUpdloadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError('Please select an image');
//         return;
//       }
//       setImageUploadError(null);
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + '-' + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           setImageUploadError('Image upload failed');
//           setImageUploadProgress(null);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImageUploadProgress(null);
//             setImageUploadError(null);
//             setFormData({ ...formData, image: downloadURL });
//           });
//         }
//       );
//     } catch (error) {
//       setImageUploadError('Image upload failed');
//       setImageUploadProgress(null);
//       console.log(error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setPublishError(data.message);
//         return;
//       }

//       if (res.ok) {
//         setPublishError(null);
//         navigate(`/post/${data.slug}`);
//       }
//     } catch (error) {
//       setPublishError('Something went wrong');
//     }
//   };
//   return (
//     <div className='p-3 max-w-3xl mx-auto min-h-screen'>
//       <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
//       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
//         <div className='flex flex-col gap-4 sm:flex-row justify-between'>
//           <TextInput
//             type='text'
//             placeholder='Title'
//             required
//             id='title'
//             className='flex-1'
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             value={formData.title}
//           />
//           <Select
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//             value={formData.category}
//           >
//             <option value='uncategorized'>Select a category</option>
//             <option value='javascript'>JavaScript</option>
//             <option value='reactjs'>React.js</option>
//             <option value='nextjs'>Next.js</option>
//           </Select>
//         </div>
//         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
//           <FileInput
//             type='file'
//             accept='image/*'
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <Button
//             type='button'
//             className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition'
//             size='sm'
//             outline
//             onClick={handleUpdloadImage}
//             disabled={imageUploadProgress}
//           >
//             {imageUploadProgress ? (
//               <div className='w-16 h-16'>
//                 <CircularProgressbar
//                   value={imageUploadProgress}
//                   text={`${imageUploadProgress || 0}%`}
//                 />
//               </div>
//             ) : (
//               'Upload Image'
//             )}
//           </Button>
//         </div>
//         {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
//         {formData.image && (
//           <img
//             src={formData.image}
//             alt='upload'
//             className='w-full h-72 object-cover'
//           />
//         )}
//         <ReactQuill
//           theme='snow'
//           value={formData.content}
//           placeholder='Write something...'
//           className='h-72 mb-12'
//           required
//           onChange={(value) => {
//             setFormData({ ...formData, content: value });
//           }}
//         />
//         <Button type='submit' className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition'>
//           Update post
//         </Button>
//         {publishError && (
//           <Alert className='mt-5' color='failure'>
//             {publishError}
//           </Alert>
//         )}
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill();

  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: ''
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;
  // Load existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setFormData({
          title: data.posts[0].title,
          category: data.posts[0].category,
          content: data.posts[0].content,
          image: data.posts[0].image
        });
        if (quill) {
          quill.root.innerHTML = data.posts[0].content;
        }
      } catch (err) {
        console.error(err);
        setPublishError('Failed to load post');
      }
    };
    fetchPost();
  }, [postId, quill]);

  // Update content on quill change
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setFormData(prev => ({ ...prev, content: quill.root.innerHTML }));
      });
    }
  }, [quill]);

  const handleUploadImage = async () => {
    if (!file) {
      setUploadError('Please select an image');
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'unsigned_preset'); // your cloudinary preset

      const res = await fetch('https://api.cloudinary.com/v1_1/dw4mzhgy8/image/upload', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Upload failed');

      setFormData(prev => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.error(err);
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setPublishing(true);
  try {
    const res = await fetch(`http://localhost:3000/api/post/updatepost/${postId}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      setPublishError(data.message);
      return;
    }

    navigate(`/post/${data.slug}`);
  } catch (err) {
    console.error(err);
    setPublishError('Something went wrong');
  } finally {
    setPublishing(false);
  }
};
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className='flex-1'
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
             <option value='uncategorized'>Select a category</option>
                <option value='Technology'>Technology</option>
                <option value='Finance'>Finance</option>
                <option value='Travel'>Travel</option>
                <option value='Fashion'>Fashion</option>
                <option value='Gaming'>Gaming</option>
          </Select>
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>

        {uploadError && <Alert color='failure'>{uploadError}</Alert>}

        {formData.image && (
          <img
            src={formData.image}
            alt='Uploaded'
            className='w-full h-72 object-cover rounded mb-6'
          />
        )}

        <div className='h-72 mb-11'>
          <div ref={quillRef} className='h-full'/>
        </div>

        {publishError && <Alert color='failure'>{publishError}</Alert>}

        <Button
          type='submit'
          className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition mt-8'
          disabled={publishing}
        >
          {publishing ? 'Updating...' : 'Update Post'}
        </Button>
      </form>
    </div>
  );
}
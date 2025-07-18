import { Alert, Modal } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3000';

  const inputClass =
    'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-2';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // preview before upload
    }
  };

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  const uploadImageToCloudinary = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'unsigned_preset');
    data.append('cloud_name', 'dw4mzhgy8');

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/dw4mzhgy8/image/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setImageFileUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setImageFileUrl(response.secure_url);
          setFormData({ ...formData, profilePicture: response.secure_url });
          setImageFileUploading(false);
        } else {
          setImageFileUploadError('Cloudinary upload failed');
          setImageFileUploading(false);
        }
      };

      xhr.onerror = () => {
        setImageFileUploadError('Upload failed. Check network or Cloudinary config.');
        setImageFileUploading(false);
      };

      xhr.send(data);
    } catch (err) {
      console.error(err);
      setImageFileUploadError('Unexpected error during upload');
      setImageFileUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image upload to finish');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`${API_URL}/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data?.message || 'Update failed'));
        setUpdateUserError(data?.message || 'Update failed');
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully");
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
      setUpdateUserError(err.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${API_URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data?.message || 'Delete failed'));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate('/signin');
      }
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/signin');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!currentUser) {
    return (
      <div className='text-center mt-10 text-xl'>
        User not found. Please <Link to="/signin" className='text-blue-500 underline'>sign in</Link>.
      </div>
    );
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div
          className="relative w-32 h-32 self-center cursor-pointer rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500"
          onClick={() => filePickerRef.current.click()}
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: { width: '100%', height: '100%', position: 'absolute' },
                  path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                }}
              />
            )}
            {(imageFileUrl || currentUser?.profilePicture) ? (
              <img
                src={imageFileUrl || currentUser.profilePicture}
                alt="Profile"
                className={`w-full h-full object-cover rounded-full ${
                  imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
                }`}
              />
            ) : (
              <span className="text-purple-600 text-5xl font-bold">
                {currentUser?.username?.charAt(0).toUpperCase() || "?"}
              </span>
            )}
          </div>
        </div>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

        <input
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
          className={inputClass}
        />

        <button
          type='submit'
          disabled={loading || imageFileUploading}
          className='bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-70'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

        {currentUser.isAdmin && (
          <Link to='/create-post'>
            <button className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition'>
              Create a post
            </button>
          </Link>
        )}
      </form>

      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>

      {updateUserSuccess && <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>}
      {updateUserError && <Alert color='failure' className='mt-5'>{updateUserError}</Alert>}
      {error && <Alert color='failure' className='mt-5'>{error}</Alert>}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <div className="p-6 text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDeleteUser}
              className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-90"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:opacity-90"
            >
              No, cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

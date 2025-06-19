import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from '../features/upload/uploadApi.js';

const SetProfilePic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { avatarImage, isAvatarImageSet, loading, error } = useSelector((state) => state.upload);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('chat-app-user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    if (isAvatarImageSet) {
      
      
      setTimeout(() => {
      toast.success("Profile picture set successfully", toastOptions);
    }, 100);
      // localStorage.setItem(
      //   'chat-app-user',
      //   JSON.stringify({
      //     ...JSON.parse(storedUser),
      //     avatarImage,
      //   })
      // );
      navigate('/chat');
    }
  }, [navigate, isAvatarImageSet, avatarImage]);

  useEffect(() => {
  console.log("Component Mounted");
  console.log({ avatarImage, isAvatarImageSet, loading, error });
}, [avatarImage, isAvatarImageSet, loading, error]);


  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 1) { // 1MB limit
      toast.error("File size should be less than 1MB", toastOptions);
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!selectedImage) {
      toast.error("Please select an image", toastOptions);
      return;
    }

    dispatch(uploadImage(selectedImage));
  };

  return (
    <FormContainer>
      <h2>Select Your Profile Picture</h2>

      {imagePreview && (
        <center>
          <img
            src={imagePreview}
            alt="Selected"
            className="selected-image"
            style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '1rem' }}
          />
        </center>
      )}

      <input
        type="file"
        id="img"
        onChange={handleSelectFile}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <label htmlFor="img">Click me to upload Profile Picture</label>

      {selectedImage && (
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Save'}
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ToastContainer />
    </FormContainer>
  );
};

export default SetProfilePic;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(to bottom, #128c7e 0%, #128c7e 20%, #dcdcdc 20%, #dcdcdc 100%);

  h2 {
    color: white;
    margin-bottom: 1rem;
  }

  label {
    background-color: white;
    padding: 1rem;
    border-radius: 0.4rem;
    color: grey;
    font-size: 1rem;
    cursor: pointer;
  }

  button {
    background-color: #128c7e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #075e54;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

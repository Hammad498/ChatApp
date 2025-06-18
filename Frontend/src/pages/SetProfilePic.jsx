import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import uploadImage from '../features/upload/uploadApi.js'
import { useState, useEffect } from 'react'


const SetProfilePic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {avatarImage,isAvatarImageSet,loading,error,success} = useSelector((state) => state.upload);

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
        }
        if (isAvatarImageSet) {
            toast.success("Profile picture set successfully", toastOptions);
            localStorage.setItem('chat-app-user', JSON.stringify({ ...JSON.parse(localStorage.getItem('chat-app-user')), avatarImage }));
            navigate('/');
        }
    }, [navigate,isAvatarImageSet, avatarImage, toastOptions]);

    const handleUpload=(e)=>{
        if(!file){
            toast.error("Please select an image", toastOptions);
            return;
        }
        const file = e.target.files[0];
        dispatch(uploadImage(file));
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));

    if (file && file.size > (1024 * 1024)*5) { // Check if file size is greater than 5MB
            toast.error("File size should be less than 1MB", toastOptions);
            setSelectedImage(null);
            setImagePreview(null);
            return;
        }
        
    }

    const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
  };



  return (
    <FormContainer>
        <div>
            {file && (
                <center>
                <img src={imagePreview} alt="Selected" className="selected-image" />
                </center>
            )}
            <input
          type="file"
          id="img"
          onChange={handleSelectFile}
          style={{ display: "none" }}
        />
        <label htmlFor="img">Click me to upload Profile Picture</label>

        {file && (
          <button onClick={handleUpload} className="btn-green">
            {loading ? "Uploading..." : "Save"}
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <ToastContainer />
    </FormContainer>
  )
}

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
  }
`;

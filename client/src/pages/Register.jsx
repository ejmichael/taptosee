import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaYoutube, FaInstagram , FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaSquareXTwitter, FaTiktok, FaFacebook   } from "react-icons/fa6";
import  {useAuthContext} from '../hooks/useAuthContext'

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {dispatch} = useAuthContext()

  const [profilePicture, setProfilePicture] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

    // Icon Mapping
    const iconMap = [
        { key: "youtube", icon: FaYoutube },
        { key: "instagram", icon: FaInstagram },
        { key: "twitter", icon: FaSquareXTwitter },
        { key: "linkedin", icon: FaLinkedin },
        { key: "tiktok", icon: FaTiktok },
        { key: "facebook", icon: FaFacebook },
    ];
      
  

  const domain = window.location.href.includes('localhost') ? "http://localhost:5000" : "https://taptosee-backend.onrender.com";

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    emailAddress: '',
    username: '',
    phoneNumber: '',
    password: '',
    bio: '',
    links: [],
    socialMediaLinks: iconMap.map(({ key }) => ({ title: key, url: "" })), // Initialize with icons
    profilePicture: null
  });
  

  console.log(formData);
  

  const redirectPath = location.state?.path || '/';

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value; // Update the correct field (title or url)
    setFormData(prevState => ({
      ...prevState,
      links: updatedLinks
    }));
  };
  
  const handleSocialMediaLinkChange = (index, key, value) => {
    setFormData((prevState) => {
      // Ensure that the socialMediaLinks array is updated correctly
      const updatedLinks = [...prevState.socialMediaLinks];
  
      // Check if the object at the given index exists, if not, initialize it
      if (!updatedLinks[index]) {
        updatedLinks[index] = { title: key, url: value.trim() }; // Add the new object
      } else {
        updatedLinks[index].url = value.trim(); // Update the URL
      }
  
      // If the URL is empty, remove that link from the array
      if (updatedLinks[index].url === "") {
        updatedLinks.splice(index, 1);
      }
  
      return { ...prevState, socialMediaLinks: updatedLinks };
    });
  };
 


const handleAddLink = () => {
    setFormData(prevState => ({
      ...prevState,
      links: [...prevState.links, { title: '', url: '' }] // Add new empty link object
    }));
  };

const handleImageUpload = async(e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_own_preset");

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dwvrx1rhr/image/upload", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        console.log("Cloudinary Upload Response:", data);
  
        setImageURL(data.secure_url); // Save uploaded image URL

         // Update formData with the image URL
         setFormData((prevState) => ({
            ...prevState,
            profilePicture: data.secure_url, // Save URL in formData
          }));
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const filteredLinks = formData.socialMediaLinks.filter(link => link.url.trim() !== "");

    console.log("Submitting data:", { ...formData, socialMediaLinks: filteredLinks });
    

    if (!formData.emailAddress || !formData.password) return;

    const requestData = { 
        ...formData, 
        socialMediaLinks: filteredLinks 
    };
    
  
    try {
      const response = await axios.post(domain + '/api/user/create-user', requestData, { 
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('user', JSON.stringify(response.data.user));
    //   navigate(redirectPath, { replace: true });
      if(response.data.user) {
        dispatch({ type: 'REGISTER', payload: response.data.user });
        navigate('/'+ response.data.user.username)
      }

    console.log(response.data);
    
    } catch (error) {
      console.error('Register failed', error);
      setLoading(false)
    }
  };

  return (
    <div className='w-full  bg-gradient-to-b from-indigo-600 to-purple-700 py-12'>
      <div className="max-w-lg mx-auto flex-col shadow-lg rounded-xl w-[90%] md:w-[50%] p-6 bg-white">
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className='font-semibold text-3xl text-gradient-to-r from-pink-500 to-yellow-400'>Create Your Page</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 text-sm">

            <div className="w-full flex flex-col items-center justify-center gap-3 border border-gray-300 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Profile Picture</label>

                {/* Image Preview */}
                {imageURL && <img src={imageURL} className="w-24 h-24 object-cover rounded-full shadow-md" alt="Uploaded" style={{ width: 100 }} />}
                
                {/* File Input */}
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                    Choose Image
                    <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload}
                    />
                </label>
            </div>

            <input 
            type="text" 
            className="border text-sm rounded-lg p-2 w-full" 
            name="username" 
            value={formData.username} 
            placeholder="Create a username" 
            onChange={handleChange} 
            
        />

        
          <div className="flex gap-2 flex-col md:flex-row">
            
            <input 
                type="text" 
                className="border text-sm rounded-lg p-2 w-full" 
                name="firstName" value={formData.firstName} 
                placeholder="First Name" 
                onChange={handleChange} 
                required
            />
            
            <input 
                type="text" 
                className="border text-sm rounded-lg p-2 w-full" 
                name="surname" 
                value={formData.surname} 
                placeholder="Surname" 
                onChange={handleChange}
                required
            />
          </div>

          
          <input 
            type="text" 
            className="border text-sm rounded-lg p-2 w-full" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            placeholder="Phone Number" 
            onChange={handleChange} 
            
        />
          
          <input 
            type="email" 
            className="border text-sm rounded-lg p-2 w-full" 
            name="emailAddress" 
            value={formData.emailAddress} 
            placeholder="Email Address" 
            onChange={handleChange} 
            required
        />
          
          <input 
            type="password" 
            className="border text-sm rounded-lg p-2 w-full" 
            name="password" 
            value={formData.password} 
            placeholder="Password" 
            onChange={handleChange} 
            required
        />
          
          <textarea 
            className="border text-sm rounded-lg p-2 w-full" 
            name="bio" 
            value={formData.bio} 
            placeholder="Bio" 
            onChange={handleChange}
            required 
        />

        
          
        <div className='w-full'>
        {iconMap.map(({ key, icon:Icon, label }, index) => (
            <div key={key} className='flex my-2 items-center'>
                <div
                    id="socialMedia"
                    name="socialMediaLink"
                    value={iconMap.key}
                    
                    className="border flex items-center text-lg text-gray-600 h-10 rounded-l-lg p-2"   
                >
                    <Icon/>
                </div>
                <input
                    type='text'
                    name={key}
                    value={formData.socialMediaLinks[index]?.url || ""}
                    className="border h-10 text-sm rounded-r-lg p-2 w-full" 
                    placeholder='Insert link'    
                    onChange={(e) => handleSocialMediaLinkChange(index, key, e.target.value)}    
                />
                </div>
            ))}
        </div>

            {/* Website Links */}
            {formData.links.map((link, index) => (
            <div key={index} className='space-y-2'>
                <div className='flex my-2 items-center'>
                <div className="border flex items-center text-lg text-gray-600 h-10 rounded-l-lg p-2">
                    <FaGlobe />
                </div>
                <input
                    type='text'
                    value={link.title}
                    className="border h-10 text-sm rounded-r-lg p-2 w-full"
                    placeholder={`Link Title ${index + 1}`}
                    onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                />
                </div>

                <div className='flex my-2 items-center'>
                <input
                    type='text'
                    value={link.url}
                    className="border h-10 text-sm rounded-r-lg p-2 w-full"
                    placeholder={`Insert URL for ${link.title}`}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                />
                </div>
            </div>
            ))}

          {/* Add Website Link Button */}
          <button type="button" onClick={handleAddLink} className="text-blue-500 hover:underline">
            Add another link
          </button>

          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:shadow-md">
            {loading ? "Creating acccount..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

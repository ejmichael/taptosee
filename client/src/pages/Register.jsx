import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaYoutube, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaSquareXTwitter, FaTiktok, FaFacebook } from "react-icons/fa6";
import { useAuthContext } from '../hooks/useAuthContext';
import ProfilePreview from './ProfilePreview';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAuthContext();

  const [profilePicture, setProfilePicture] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Icon Mapping with brand colors
  const iconMap = [
    { key: "youtube", icon: FaYoutube, color: "#FF0000" },
    { key: "instagram", icon: FaInstagram, color: "#C13584" },
    { key: "twitter", icon: FaSquareXTwitter, color: "#1DA1F2" },
    { key: "linkedin", icon: FaLinkedin, color: "#0077B5" },
    { key: "tiktok", icon: FaTiktok, color: "#69C9D0" },
    { key: "facebook", icon: FaFacebook, color: "#1877F2" },
  ];

  // const templates = [
  //   { id: "template1", name: "Minimal", colors: "bg-white text-gray-900", shadow: "shadow-lg" },
  //   { id: "template2", name: "Gradient Glow", colors: "bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-white", shadow: "shadow-2xl" },
  //   { id: "template3", name: "Dark Mode", colors: "bg-gray-900 text-white", shadow: "shadow-inner" },
  // ];

  const templates = {
    "template1": {
      id: "template1",
      pageBg: 'from-blue-600 to-purple-700 ',
      formBg: 'bg-white',
      headingColor: 'text-black',
      bioColor: 'text-gray-500',
      linkBG: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    template2: {
      id: "template2",
      pageBg: 'from-pink-400 via-red-400 to-yellow-400',
      formBg: 'bg-white/80',
      headingColor: 'text-gray-900',
      bioColor: 'text-gray-700',
      linkBG: 'bg-pink-500 hover:bg-pink-600 text-white'
    },
    template3: {
      id: "template3",
      pageBg: 'from-gray-900 to-slate-200',
      formBg: 'bg-white',
      headingColor: 'text-white',
      bioColor: 'text-gray-300',
      linkBG: 'bg-gray-700 hover:bg-gray-600 text-white'
    },
    template4: {
      id: "template4",
      pageBg: 'from-indigo-500 via-purple-500 to-pink-500',
      formBg: 'bg-white/90',
      headingColor: 'text-indigo-900',
      bioColor: 'text-gray-700',
      linkBG: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    template5: {
      id: "template5",
      pageBg: 'from-green-400 to-teal-500',
      formBg: 'bg-white',
      headingColor: 'text-teal-900',
      bioColor: 'text-teal-700',
      linkBG: 'bg-green-500 hover:bg-green-600 text-white'
    },
    template6: {
      id: "template6",
      pageBg: 'from-yellow-300 via-orange-400 to-red-500',
      formBg: 'bg-white/90',
      headingColor: 'text-red-800',
      bioColor: 'text-orange-700',
      linkBG: 'bg-yellow-500 hover:bg-yellow-600 text-white'
    },
    template7: {
      id: "template6",
      pageBg: 'from-purple-600 to-pink-600',
      formBg: 'bg-white/95',
      headingColor: 'text-purple-900',
      bioColor: 'text-pink-700',
      linkBG: 'bg-pink-500 hover:bg-pink-600 text-white'
    },
    template8: {
      id: "template8",
      pageBg: 'bg-gradient-to-b from-indigo-700 via-purple-600 to-pink-500',
      formBg: 'bg-white/90',
      headingColor: 'text-indigo-900',
      bioColor: 'text-gray-700',
      linkBG: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },

    template9: {
      id: "template9",
      pageBg: 'bg-gradient-to-r from-teal-400 via-green-400 to-lime-300',
      formBg: 'bg-white',
      headingColor: 'text-teal-900',
      bioColor: 'text-green-700',
      linkBG: 'bg-teal-500 hover:bg-teal-600 text-white'
    },

    template10: {
      id: "template10",
      pageBg: 'bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600',
      formBg: 'bg-gray-900/90',
      headingColor: 'text-white',
      bioColor: 'text-gray-300',
      linkBG: 'bg-gray-700 hover:bg-gray-600 text-white'
    },

    template11: {
      id: "template11",
      pageBg: 'bg-gradient-to-r from-orange-400 via-pink-400 to-red-400',
      formBg: 'bg-white/95',
      headingColor: 'text-red-800',
      bioColor: 'text-pink-700',
      linkBG: 'bg-pink-500 hover:bg-pink-600 text-white'
    },
  }

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
    socialMediaLinks: iconMap.map(({ key }) => ({ title: key, url: "" })),
    profilePicture: null,
    template: "template1"
  });

  const redirectPath = location.state?.path || '/';

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      links: updatedLinks
    }));
  };

  const handleSocialMediaLinkChange = (index, key, value) => {
    setFormData((prevState) => {
      const updatedLinks = [...prevState.socialMediaLinks];
      if (!updatedLinks[index]) {
        updatedLinks[index] = { title: key, url: value.trim() };
      } else {
        updatedLinks[index].url = value.trim();
      }
      if (updatedLinks[index].url === "") updatedLinks.splice(index, 1);
      return { ...prevState, socialMediaLinks: updatedLinks };
    });
  };

  const handleAddLink = () => {
    setFormData(prevState => ({
      ...prevState,
      links: [...prevState.links, { title: '', url: '' }]
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
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
      setImageURL(data.secure_url);
      setFormData(prevState => ({ ...prevState, profilePicture: data.secure_url }));
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };

  const handleTemplateSelection = (id) => {
    setFormData(prevState => ({ ...prevState, template: id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const filteredLinks = formData.socialMediaLinks.filter(link => link.url.trim() !== "");
    if (!formData.emailAddress || !formData.password) return;

    const requestData = { ...formData, socialMediaLinks: filteredLinks };

    try {
      const response = await axios.post(domain + '/api/user/create-user', requestData, { headers: { 'Content-Type': 'application/json' } });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.user) {
        dispatch({ type: 'REGISTER', payload: response.data.user });
        navigate('/' + response.data.user.username);
      }
    } catch (error) {
      console.error('Register failed', error);
      setLoading(false);
    }
  };

  return (
    <div className='w-full bg-gradient-to-b from-indigo-600 to-purple-700 py-12 relative'>
      <div className="max-w-lg mx-auto flex-col shadow-2xl rounded-xl w-[90%] md:w-[50%] p-6 bg-white">
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className='font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400'>Create Your Page</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">

          {/* Profile Picture */}
          <div className="w-full flex flex-col items-center justify-center gap-3 border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-50">
            <label className="text-sm font-medium text-gray-700">Profile Picture</label>
            {imageURL && <img src={imageURL} className="w-28 h-28 object-cover rounded-full shadow-lg border-2 border-gray-200" alt="Uploaded" />}
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition duration-200">
              Choose Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* User Inputs */}
          <input type="text" name="username" value={formData.username} placeholder="Create a username" onChange={handleChange}
            className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />

          <div className="flex gap-2 flex-col md:flex-row">
            <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required
              className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />
            <input type="text" name="surname" value={formData.surname} placeholder="Surname" onChange={handleChange} required
              className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />
          </div>

          <input type="text" name="phoneNumber" value={formData.phoneNumber} placeholder="Phone Number" onChange={handleChange}
            className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />

          <input type="email" name="emailAddress" value={formData.emailAddress} placeholder="Email Address" onChange={handleChange} required
            className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />

          <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} required
            className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />

          <textarea name="bio" value={formData.bio} placeholder="Bio" onChange={handleChange} required
            className="border rounded-lg p-2 w-full text-gray-800 focus:ring-2 focus:ring-indigo-500" />

          {/* Social Icons */}
          <div className='w-full'>
            {iconMap.map(({ key, icon: Icon, color }, index) => (
              <div key={key} className='flex my-2 items-center'>
                <div className="border flex items-center text-lg h-10 rounded-l-lg p-2" style={{ color }}>{<Icon />}</div>
                <input type='text' name={key} value={formData.socialMediaLinks[index]?.url || ""} placeholder='Insert link'
                  onChange={(e) => handleSocialMediaLinkChange(index, key, e.target.value)}
                  className="border h-10 text-sm rounded-r-lg p-2 w-full focus:ring-2 focus:ring-indigo-500" />
              </div>
            ))}
          </div>

          {/* Website Links */}
          {formData.links.map((link, index) => (
            <div key={index} className='space-y-2'>
              <div className='flex my-2 items-center'>
                <div className="border flex items-center text-lg text-gray-600 h-10 rounded-l-lg p-2"><FaGlobe /></div>
                <input type='text' value={link.title} placeholder={`Link Title ${index + 1}`}
                  onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                  className="border h-10 text-sm rounded-r-lg p-2 w-full focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className='flex my-2 items-center'>
                <input type='text' value={link.url} placeholder={`Insert URL for ${link.title}`}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="border h-10 text-sm rounded-r-lg p-2 w-full focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          ))}

          <button type="button" onClick={handleAddLink} className="text-blue-500 hover:underline">Add another link</button>

          {/* Template Selection */}
          <div className="my-6">
            <p className="font-semibold mb-2">Choose a Template</p>
            <div className="grid grid-cols-5 gap-2">
              {Object.values(templates).map(template => (
                <div key={template.id} onClick={() => handleTemplateSelection(template.id)}
                  className={`cursor-pointer w-1/3 p-4 rounded-lg flex flex-col items-center justify-center transition transform hover:scale-105 bg-gradient-to-b ${template.pageBg} border-2 ${formData.template === template.id ? 'border-indigo-500' : 'border-transparent'}`}>
                  <span className="text-sm font-bold">{template.name}</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setShowPreview(true)}
              className="mt-2 w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Preview Template</button>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>

      {/* Full Page Modal Preview */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <button
              className="absolute z-50  top-2 right-2 text-white bg-gray-800 rounded-full px-3 py-2 hover:bg-gray-700 transition"
              onClick={() => setShowPreview(false)}
            >
              ✕
          </button>
          <ProfilePreview formData={formData}/>
        </div>
      )}
    </div>
  );
};

export default Register;

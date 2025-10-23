import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaYoutube, FaInstagram , FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaSquareXTwitter, FaTiktok, FaFacebook, FaCopy   } from "react-icons/fa6";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";


const ProfilePreview = ({formData}) => {
 

  const templates = {
    "template1": {
      pageBg: 'from-blue-600 to-purple-700 ',
      formBg: 'bg-white',
      headingColor: 'text-black',
      bioColor: 'text-gray-500',
      linkBG: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    template2: {
      pageBg: 'from-pink-400 via-red-400 to-yellow-400',
      formBg: 'bg-white/80',
      headingColor: 'text-gray-900',
      bioColor: 'text-gray-700',
      linkBG: 'bg-pink-500 hover:bg-pink-600 text-white'
    },
    template3: {
      pageBg: 'from-gray-700 to-gray-400',
      formBg: 'bg-slate-200',
      headingColor: 'text-black',
      bioColor: 'text-gray-500',
      linkBG: 'bg-gray-800 hover:bg-gray-600 text-white'
    },
    template4: {
      pageBg: 'from-indigo-500 via-purple-500 to-pink-500',
      formBg: 'bg-white/90',
      headingColor: 'text-indigo-900',
      bioColor: 'text-gray-700',
      linkBG: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    },
    template5: {
      pageBg: 'from-green-400 to-teal-500',
      formBg: 'bg-white',
      headingColor: 'text-teal-900',
      bioColor: 'text-teal-700',
      linkBG: 'bg-green-500 hover:bg-green-600 text-white'
    },
    template6: {
      pageBg: 'from-yellow-300 via-orange-400 to-red-500',
      formBg: 'bg-white/90',
      headingColor: 'text-red-800',
      bioColor: 'text-orange-700',
      linkBG: 'bg-yellow-500 hover:bg-yellow-600 text-white'
    },
    template7: {
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

// useEffect(() => {

//     const getProfileData = async () => {

//         try {
//             const profileData = await axios.get(domain + '/api/user/get-user-data/' + username)
//             console.log(profileData.data);
            
//             setUserData(profileData.data.user)
//         } catch (error) {
//             console.error("Error fetching profile info:", error);
//         }

//     }
    
//     getProfileData()

// }, [username])

// const copyToClipboard = () => {
//     // Use the Clipboard API to copy the link
//     navigator.clipboard
//     .writeText(window.location.href) // Copy current URL
//     .then(() => {
//       setCopySuccess(true);
//       // Reset copy success after 2 seconds
//       setTimeout(() => setCopySuccess(false), 2000);
//     })
//     .catch((error) => {
//       console.error("Failed to copy the URL: ", error);
//     });
// }


  // Icon Mapping
  const iconMap = {
    youtube: FaYoutube,
    instagram: FaInstagram,
    twitter: FaSquareXTwitter ,
    linkedin: FaLinkedin,
    website: FaGlobe, // Default icon for general websites
    tiktok: FaTiktok, 
    facebook: FaFacebook, 
  };

  const template = templates[formData?.template] || templates.template1;

  return (

    <>
    {/* {username === user?.username && (
      <Navbar/>
    )} */}
     <div className={`min-h-screen bg-gradient-to-b flex flex-col flex justify-center items-center px-4  ${template.pageBg}`}>
      <div className={`relative w-full h-[95vh] md:h-[65vh] flex flex-col md:max-w-md  shadow-lg rounded-xl p-8 text-center ${template.formBg}`}>
        {/* <div className="absolute top-2 right-2 w-full flex justify-end">
            <div className="absolute flex flex-col">
                <button
                className=" top-4 left-4 text-slate-400 p-2 rounded-full"
                onClick={copyToClipboard}
                title="Copy Profile URL"
                >
                <FaCopy />
                </button>
                {copySuccess && (
                <span className=" top-4 left-4 text-slate-500 text-xs">Copied!</span>
                )} 
            </div>
        </div> */}
        {/* Profile Header */}
        <div className="text-center md:my-5 my-10">
          <img
            src={formData?.profilePicture || "https://via.placeholder.com/150"}
            alt={`${formData?.firstName}'s avatar`}
            className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gray-300"
          />
          <div className="my-2">
            <h2 className={`my-2 text-xl ${template.headingColor} font-semibold`}>{`${formData?.firstName} ${formData?.surname}`}</h2>
            <p className={`${template.bioColor} text-sm`}>{formData?.bio}</p>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-4 flex justify-around px-4 gap-2  flex-wrap">
          {formData?.socialMediaLinks?.map((link, index) => {
            // Extract platform name from the URL or title
            const platformName = Object.keys(iconMap).find(key =>
              link?.title?.includes(key)
            ) || "website"; // Default to "website" if no match
            
            const Icon = iconMap[platformName]; // Get corresponding icon

            return (
                <a
                key={index}
                href={link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white  font-semibold  md:py-4 md:px-4 p-3 rounded-full transition duration-300 ${template.linkBG}`}
              >
                {/* Icon on the Left */}
                <Icon className="" />
              
                {/* Centered Text */}
                {/* <span className="flex-1 text-center">{link.title}</span> */}
              </a>
              
            );
          })}
        </div>

        {/* Links */}
        <div className="mt-4 space-y-4 ">
          {formData?.links?.map((link, index) => {
            // Extract platform name from the URL or title
            const platformName = Object.keys(iconMap).find(key =>
              link.url.toLowerCase().includes(key)
            ) || "website"; // Default to "website" if no match
            
            const Icon = iconMap[platformName]; // Get corresponding icon

            return (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative text-lg flex items-center w-full mx-auto ${template.linkBG} font-semibold py-4 px-6 rounded-full transition duration-300`}
              >
                {/* Icon on the Left */}
                <Icon className="md:text-xl absolute left-4" />
              
                {/* Centered Text */}
                <span className="flex-1 text-basis text-center">{link.title}</span>
              </a>
              
            );
          })}
        </div>
        <Link to="/auth/register" className="text-sm mt-auto text-blue-500">
            <button className="">Create my own</button>
        </Link>
      </div>

      
    </div>   
    </>

  );
};

export default ProfilePreview;

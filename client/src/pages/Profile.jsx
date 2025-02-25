import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaYoutube, FaInstagram , FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaSquareXTwitter, FaTiktok, FaFacebook   } from "react-icons/fa6";
import axios from "axios";

const Profile = () => {
  const { username } = useParams();

  const domain = window.location.href.includes('localhost') ? "http://localhost:5000" : "https://taptosee-backend.onrender.com";

    const [userData, setUserData] = useState(null)

//   const user = {
//     name: "Miranda Leigh Ghidari",
//     bio: "Fitness Coach | Certified Dietitian | Helping You Build Strength & Confidence 💪",
//     avatar: "https://via.placeholder.com/100",
//     links: [
//       { title: "Website", url: "https://startyourhustle.com" },
//       { title: "Dietician (Coming soon)", url: "https://miranda-fitness.onrender.com" },
//     ],
//     socialMedia: [
//         { title: "YouTube", url: "https://youtube.com" },
//         { title: "Instagram", url: "https://instagram.com/miranda_leigh_ghidari" },
//         { title: "Twitter", url: "https://twitter.com" },
//         { title: "LinkedIn", url: "https://linkedin.com" },
//         { title: "TikTok", url: "https://tiktok.com" },
  
//     ]
// };

useEffect(() => {

    const getProfileData = async () => {

        try {
            const profileData = await axios.get(domain + '/api/user/get-user-data/' + username)
            console.log(profileData.data);
            
            setUserData(profileData.data.user)
        } catch (error) {
            console.error("Error fetching profile info:", error);
        }

    }
    
    getProfileData()

}, [userId])


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

  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col from-blue-600 to-purple-700 flex justify-center items-center px-4">
      <div className="w-full h-[95vh] md:h-[65vh] flex flex-col md:max-w-md bg-white shadow-lg rounded-xl p-8 text-center">
        
        {/* Profile Header */}
        <div className="text-center md:my-5 my-10">
          <img
            src={userData?.profilePicture || "https://via.placeholder.com/150"}
            alt={`${userData?.firstName}'s avatar`}
            className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gray-300"
          />
          <div className="my-2">
            <h2 className="my-2 text-xl font-semibold">{`${userData?.firstName} ${userData?.surname}`}</h2>
            <p className="text-gray-500 text-sm">{userData?.bio}</p>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-4 flex justify-around px-4 gap-2  flex-wrap">
          {userData?.socialMediaLinks?.map((link, index) => {
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
                className="text-white bg-blue-600 hover:bg-blue-700 font-semibold  md:py-4 md:px-4 p-3 rounded-full transition duration-300"
              >
                {/* Icon on the Left */}
                <Icon className=" " />
              
                {/* Centered Text */}
                {/* <span className="flex-1 text-center">{link.title}</span> */}
              </a>
              
            );
          })}
        </div>

        {/* Links */}
        <div className="mt-4 space-y-4 ">
          {userData?.links?.map((link, index) => {
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
                className="relative text-lg flex items-center w-full mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full transition duration-300"
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
  );
};

export default Profile;

import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook, FaTiktok, FaGithub, FaTwitch, FaDiscord, FaSnapchat, FaPinterest, FaGlobe } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FiExternalLink } from 'react-icons/fi'
import { getPublicProfile } from '../../api/user.js'
import { recordView, recordClick } from '../../api/analytics.js'
import { getTemplate } from '../../utils/templates.js'
import NotFound from './NotFound.jsx'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'

const ICON_MAP = {
  youtube: FaYoutube, instagram: FaInstagram, twitter: FaSquareXTwitter,
  linkedin: FaLinkedin, tiktok: FaTiktok, facebook: FaFacebook,
  github: FaGithub, twitch: FaTwitch, discord: FaDiscord,
  snapchat: FaSnapchat, pinterest: FaPinterest, website: FaGlobe,
}

export default function ProfilePage() {
  const { username } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getPublicProfile(username)
      .then((r) => {
        setData(r.data)
        recordView(r.data.user._id).catch(() => {})
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [username])

  const handleLinkClick = (id) => {
    recordClick(id).catch(() => {})
  }

  if (loading) return <LoadingSpinner fullScreen />
  if (notFound) return <NotFound />

  const { user, links, socials } = data
  const t = getTemplate(user.template)
  const displayName = user.displayName || `${user.firstName || ''} ${user.surname || ''}`.trim() || user.username
  const avatarSrc = user.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=4f46e5&color=fff&size=200`

  return (
    <div className={`min-h-screen bg-gradient-to-b ${t.pageBg} flex flex-col items-center py-10 px-4`}>
      <div className="w-full max-w-[480px]">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={avatarSrc}
            alt={displayName}
            className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
            style={{ boxShadow: '0 0 0 3px rgba(255,255,255,0.4), 0 4px 16px rgba(0,0,0,0.2)' }}
          />
          <h1 className={`text-xl font-semibold leading-tight ${t.heading}`}>{displayName}</h1>
          {user.bio && (
            <p className={`text-sm mt-2 leading-relaxed max-w-[300px] ${t.bio}`}>{user.bio}</p>
          )}
        </div>

        {/* Social icons */}
        {socials.length > 0 && (
          <div className="flex justify-center flex-wrap gap-3 mb-7">
            {socials.map((s) => {
              const Icon = ICON_MAP[s.platform] || FaGlobe
              return (
                <a key={s._id} href={s.url} target="_blank" rel="noopener noreferrer"
                  onClick={() => handleLinkClick(s._id)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-all duration-150 hover:scale-110 active:scale-95">
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col gap-2.5">
          {links.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link._id)}
              className={`flex items-center justify-center w-full h-[52px] px-5 rounded-xl font-medium text-sm transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] shadow-sm ${t.link}`}
            >
              <span className="flex items-center gap-2">
                {link.title}
                <FiExternalLink size={12} className="opacity-50" />
              </span>
            </a>
          ))}

          {links.length === 0 && socials.length === 0 && (
            <p className={`text-center text-sm py-6 ${t.bio}`}>No links added yet.</p>
          )}
        </div>
      </div>

      {/* Brand badge */}
      <Link to="/" className="mt-10 text-xs text-white/50 hover:text-white/75 transition-colors duration-150">
        Made with TapToSee
      </Link>
    </div>
  )
}

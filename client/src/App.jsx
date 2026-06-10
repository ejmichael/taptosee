import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import VerifyEmail from './pages/auth/VerifyEmail.jsx'

import DashboardLayout from './pages/dashboard/Layout.jsx'
import DashLinks from './pages/dashboard/Links.jsx'
import DashSocials from './pages/dashboard/Socials.jsx'
import DashAppearance from './pages/dashboard/Appearance.jsx'
import DashAnalytics from './pages/dashboard/Analytics.jsx'
import DashProfile from './pages/dashboard/Profile.jsx'
import DashSettings from './pages/dashboard/Settings.jsx'

import AdminLayout from './pages/admin/Layout.jsx'
import AdminUsers from './pages/admin/UserList.jsx'
import AdminStats from './pages/admin/PlatformStats.jsx'

import ProfilePage from './pages/public/ProfilePage.jsx'
import NotFound from './pages/public/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/verify-email" element={<VerifyEmail />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashLinks />} />
        <Route path="links" element={<DashLinks />} />
        <Route path="socials" element={<DashSocials />} />
        <Route path="appearance" element={<DashAppearance />} />
        <Route path="analytics" element={<DashAnalytics />} />
        <Route path="profile" element={<DashProfile />} />
        <Route path="settings" element={<DashSettings />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminStats />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="stats" element={<AdminStats />} />
      </Route>

      {/* Public profile — must be last */}
      <Route path="/:username" element={<ProfilePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

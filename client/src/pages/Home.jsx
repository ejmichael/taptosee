import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import AllSocials from '../assets/all-socials.png'
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20  px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-blue-900"
        >
          All Your Links, One Beautiful Page
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-700 md:text-lg max-w-xl mb-16"
        >
          Create a stunning personal link page in minutes. Capture more traffic. Grow your online presence.
        </motion.p>

        {/* Email capture */}
        <form className="flex flex-col md:flex-row gap-3 w-full max-w-xl mb-10">
          <input
            type="email"
            placeholder="Enter your email to get early access"
            className="flex-1 px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:opacity-90 transition-all"
          >
            Join Free
          </motion.button>
        </form>
      </section>

      {/* Features Section */}
      <section className="mt-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Why Tap To See?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <motion.div whileHover={{ y: -5 }} className="p-6 bg-white border rounded-2xl shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">Beautiful & Customizable</h3>
            <p className="text-gray-700 text-base">Choose themes, colors, images and branding to make your page uniquely yours.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-6 bg-white border rounded-2xl shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">Easy Drag & Drop</h3>
            <p className="text-gray-700 text-base">Build your page in minutes with a simple editor. No tech skills required.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="p-6 bg-white border rounded-2xl shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">Analytics Built-In</h3>
            <p className="text-gray-700 text-base">See clicks, performance and conversions in real-time.</p>
          </motion.div>
        </div>
      </section>

      {/* How It Helps / How It Works Section */}
      <section className="mt-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-900">How Tap To See Helps You</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Block: Features */}
          <div className="flex-1 grid grid-cols-2 gap-6">
            <motion.div whileHover={{ y: -5 }} className="p-6 bg-blue-100 border rounded-2xl  transition-all text-center">
              <h3 className="text-xl font-semibold mb-2">All Links in One Place</h3>
              <p className="text-gray-700 text-base">Share all your social, business, and personal links with one simple URL, making it easy for followers to connect with you.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 bg-purple-100 border rounded-2xl shadow-lg transition-all text-center">
              <h3 className="text-xl font-semibold mb-2">Track Clicks & Engagement</h3>
              <p className="text-gray-700 text-base">Get detailed analytics for every link you share so you can understand your audience and improve engagement.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 bg-pink-100 border rounded-2xl shadow-lg transition-all text-center">
              <h3 className="text-xl font-semibold mb-2">Grow Your Online Presence</h3>
              <p className="text-gray-700 text-base">Turn your single link page into a powerful marketing tool to boost traffic, followers, and conversions.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-6 bg-green-100 border rounded-2xl shadow-lg transition-all text-center">
              <h3 className="text-xl font-semibold mb-2">Easy to Share</h3>
              <p className="text-gray-700 text-base">Copy your page link and share it on social media, email, or messaging apps effortlessly.</p>
            </motion.div>
          </div>

          {/* Right Block: Image */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div className="rounded-2xl overflow-hidden">
              <img src={AllSocials} alt="App demo" className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-24 px-6 bg-gradient-to-r from-blue-100 to-purple-100 py-16 text-center rounded-2xl mx-6 md:mx-24">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">Trusted by Thousands</h2>
        <div className="flex flex-col md:flex-row justify-around gap-8">
          <div>
            <span className="text-4xl font-bold text-blue-800">10k+</span>
            <p className="text-gray-700">Creators</p>
          </div>
          <div>
            <span className="text-4xl font-bold text-blue-800">200k+</span>
            <p className="text-gray-700">Clicks Tracked</p>
          </div>
          <div>
            <span className="text-4xl font-bold text-blue-800">50k+</span>
            <p className="text-gray-700">Pages Created</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mt-24 mb-20 px-6">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Ready to Grow Your Online Presence?</h2>
        <p className="text-gray-700 mb-8">Create your first link page in under 60 seconds.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/auth/register" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-base px-10 py-4 rounded-xl font-medium shadow-lg hover:opacity-90 transition-all">
            Get Started Now
          </Link>
        </motion.div>
      </section>
      {/* Pricing Section */}
      <section className="mt-24 px-6 max-w-4xl mx-auto mb-20 bg-gradient-to-r from-blue-100 to-purple-100 p-10 rounded-2xl text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Special Launch Offer - 90% off!</h2>
        <p className="text-gray-700 mb-8">Get full access to Tap To See at an unbeatable price. 7-day cancellation period. No risk, just growth!</p>
        <div className="p-8 bg-white rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Unlimited Plan</h3>
          <p className="text-gray-700 mb-6">All features included: full customization, analytics, priority support, and more.</p>
          <span className="text-4xl font-extrabold text-blue-800 mb-10 block">only R39.90/month</span>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/auth/register" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg px-10 py-4 mt-10 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all">
              Join Now
            </Link>
          </motion.div>
          <p className="text-sm text-gray-500 mt-10">Cancel anytime within 7 days for a full refund.</p>
        </div>
      </section>

    </div>
  );
}
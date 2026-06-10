export const TEMPLATES = {
  template1:  { label: 'Ocean',     pageBg: 'from-blue-600 to-purple-700',              cardBg: 'bg-white',        heading: 'text-gray-900', bio: 'text-gray-500', link: 'bg-blue-600 hover:bg-blue-700 text-white' },
  template2:  { label: 'Sunset',    pageBg: 'from-pink-400 via-red-400 to-yellow-400',  cardBg: 'bg-white/80',     heading: 'text-gray-900', bio: 'text-gray-700', link: 'bg-pink-500 hover:bg-pink-600 text-white' },
  template3:  { label: 'Midnight',  pageBg: 'from-gray-900 to-gray-800',                cardBg: 'bg-gray-900',     heading: 'text-white',    bio: 'text-gray-300', link: 'bg-gray-700 hover:bg-gray-600 text-white' },
  template4:  { label: 'Aurora',    pageBg: 'from-indigo-500 via-purple-500 to-pink-500', cardBg: 'bg-white/90',   heading: 'text-indigo-900', bio: 'text-gray-700', link: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
  template5:  { label: 'Forest',    pageBg: 'from-green-400 to-teal-500',               cardBg: 'bg-white',        heading: 'text-teal-900', bio: 'text-teal-700', link: 'bg-green-500 hover:bg-green-600 text-white' },
  template6:  { label: 'Fire',      pageBg: 'from-yellow-300 via-orange-400 to-red-500', cardBg: 'bg-white/90',   heading: 'text-red-800',  bio: 'text-orange-700', link: 'bg-orange-500 hover:bg-orange-600 text-white' },
  template7:  { label: 'Rose',      pageBg: 'from-purple-600 to-pink-600',              cardBg: 'bg-white/95',     heading: 'text-purple-900', bio: 'text-pink-700', link: 'bg-pink-500 hover:bg-pink-600 text-white' },
  template8:  { label: 'Arctic',    pageBg: 'from-cyan-400 to-blue-600',                cardBg: 'bg-white',        heading: 'text-cyan-900', bio: 'text-cyan-700', link: 'bg-cyan-500 hover:bg-cyan-600 text-white' },
  template9:  { label: 'Emerald',   pageBg: 'from-emerald-600 to-teal-800',             cardBg: 'bg-emerald-900',  heading: 'text-white',    bio: 'text-emerald-200', link: 'bg-emerald-500 hover:bg-emerald-400 text-white' },
  template10: { label: 'Coral',     pageBg: 'from-rose-300 to-orange-300',              cardBg: 'bg-white/90',     heading: 'text-rose-900', bio: 'text-rose-600', link: 'bg-rose-500 hover:bg-rose-600 text-white' },
  template11: { label: 'Obsidian',  pageBg: 'from-slate-800 to-slate-950',              cardBg: 'bg-slate-800/70', heading: 'text-white',    bio: 'text-slate-300', link: 'bg-violet-500 hover:bg-violet-600 text-white' },
}

export const getTemplate = (name) => TEMPLATES[name] || TEMPLATES.template1

import { Link } from 'react-router-dom'
import { FiArrowRight, FiLink, FiBarChart2, FiLayout, FiGlobe, FiCheck, FiZap } from 'react-icons/fi'
import {
  FaInstagram, FaYoutube, FaLinkedin, FaFacebook, FaTiktok,
  FaGithub, FaTwitch, FaDiscord, FaPinterest, FaRedditAlien, FaWhatsapp,
} from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import Navbar from '../components/Navbar.jsx'

const features = [
  { icon: FiLink, title: 'Unlimited links', desc: 'Add as many links as you need. No artificial caps, no paywalls for basics.' },
  { icon: FiBarChart2, title: 'Real analytics', desc: 'See page views, link clicks, and referrers. Proper charts, not vanity numbers.' },
  { icon: FiLayout, title: '11 templates', desc: 'Pick a look that fits your brand. Each template changes color, type, and shape.' },
  { icon: FiGlobe, title: 'Social icons', desc: 'Connect YouTube, Instagram, TikTok, GitHub, LinkedIn, and 7 more.' },
  { icon: FiZap, title: 'Instant setup', desc: 'Your page is live the moment you register. No waiting, no approval.' },
  { icon: FiCheck, title: 'Secure by design', desc: 'Cookies, not localStorage. Rate limiting, Helmet headers, and proper auth.' },
]

const pricing = [
  {
    name: 'Free',
    price: 'R0',
    period: 'forever',
    desc: 'Everything you need to start',
    features: ['5 links', '3 social icons', 'Basic analytics', '1 template', 'TapToSee branding'],
    cta: 'Get started free',
    href: '/auth/register',
    highlight: false,
  },
  {
    name: 'Creator',
    price: 'R39',
    period: '/month',
    desc: 'For creators serious about growth',
    features: ['Unlimited links', 'All social icons', 'Full analytics + charts', 'All 11 templates', 'Remove branding', 'Priority support'],
    cta: 'Start free trial',
    href: '/auth/register',
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: 'R89',
    period: '/month',
    desc: 'For power users and businesses',
    features: ['Everything in Creator', 'Custom domain', 'Team members', 'API access', 'Advanced analytics', 'White-label'],
    cta: 'Contact sales',
    href: '/auth/register',
    highlight: false,
  },
]

const steps = [
  { n: '01', title: 'Create your account', desc: 'Pick a username, choose a template. Under 60 seconds, no credit card needed.' },
  { n: '02', title: 'Add your links', desc: 'Drop in URLs, drag to reorder, toggle any link on or off instantly.' },
  { n: '03', title: 'Share one URL', desc: 'Post taptosee.me/yourname everywhere. One link. All your content.' },
]

// ── Orbit data ────────────────────────────────────────────────────────────────
// orbit-wrap: 940×940, center at (470,470), chip: 44×44 (half=22)
// position formula: left = 470 + R*cos(deg°) - 22, top = 470 + R*sin(deg°) - 22
// Inner R=180, Mid R=295, Outer R=415

const innerIcons = [
  { l: 628, t: 448, content: '🔗' },
  { l: 448, t: 628, content: '📊' },
  { l: 268, t: 448, content: '✨' },
  { l: 448, t: 268, content: '🎨' },
]

const midIcons = [
  { l: 657, t: 657, Icon: FaInstagram,      color: '#E4405F' },
  { l: 239, t: 657, Icon: FaSquareXTwitter, color: '#000000' },
  { l: 239, t: 239, Icon: FaYoutube,        color: '#FF0000' },
  { l: 657, t: 239, Icon: FaLinkedin,       color: '#0A66C2' },
]

const outerIcons = [
  { l: 863, t: 448, Icon: FaGithub,       color: '#181717' },
  { l: 741, t: 741, Icon: FaTwitch,       color: '#9146FF' },
  { l: 448, t: 863, Icon: FaDiscord,      color: '#5865F2' },
  { l: 155, t: 741, Icon: FaTiktok,       color: '#010101' },
  { l:  33, t: 448, Icon: FaFacebook,     color: '#1877F2' },
  { l: 155, t: 155, Icon: FaRedditAlien,  color: '#FF4500' },
  { l: 448, t:  33, Icon: FaWhatsapp,     color: '#25D366' },
  { l: 741, t: 155, Icon: FaPinterest,    color: '#E60023' },
]

const ringBase = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50%',
  border: '1px solid color-mix(in srgb, var(--color-text) 12%, transparent)',
  pointerEvents: 'none',
}

const trackBase = {
  position: 'absolute', top: 0, left: 0, width: 940, height: 940,
}

// ── Mobile orbit data ─────────────────────────────────────────────────────────
// orbit-wrap: 900×900, center at (450,450)
// Inner R=165 — just wraps the hero text on a 375px screen
// Mid   R=260 — some icons visible at edges
// Outer R=350 — icons mostly off-screen, peek in from top/bottom

const mobileInnerIcons = [
  { l: 593, t: 428, content: '🔗' },
  { l: 428, t: 593, content: '📊' },
  { l: 263, t: 428, content: '✨' },
  { l: 428, t: 263, content: '🎨' },
]

const mobileMidIcons = [
  { l: 612, t: 612, Icon: FaInstagram,      color: '#E4405F' },
  { l: 244, t: 612, Icon: FaSquareXTwitter, color: '#000000' },
  { l: 244, t: 244, Icon: FaYoutube,        color: '#FF0000' },
  { l: 612, t: 244, Icon: FaLinkedin,       color: '#0A66C2' },
]

const mobileOuterIcons = [
  { l: 778, t: 428, Icon: FaGithub,      color: '#181717' },
  { l: 676, t: 676, Icon: FaTwitch,      color: '#9146FF' },
  { l: 428, t: 778, Icon: FaDiscord,     color: '#5865F2' },
  { l: 180, t: 676, Icon: FaTiktok,      color: '#010101' },
  { l:  78, t: 428, Icon: FaFacebook,    color: '#1877F2' },
  { l: 180, t: 180, Icon: FaRedditAlien, color: '#FF4500' },
  { l: 428, t:  78, Icon: FaWhatsapp,    color: '#25D366' },
  { l: 676, t: 180, Icon: FaPinterest,   color: '#E60023' },
]

const mobileTrackBase = {
  position: 'absolute', top: 0, left: 0, width: 900, height: 900,
}

const chipBase = {
  position: 'absolute',
  width: 44, height: 44,
  borderRadius: 12,
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden max-w-[1100px] mx-auto px-6 min-h-screen flex flex-col items-center justify-center py-24">

        {/* ── Mobile orbit (< md) — fixed pixel positions, no CSS scale ───────── */}
        <div className="md:hidden" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900, height: 900,
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400, height: 400, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 65%)',
            }} />
            <div style={{ ...ringBase, width: 330, height: 330 }} />
            <div style={{ ...ringBase, width: 520, height: 520 }} />
            <div style={{ ...ringBase, width: 700, height: 700 }} />

            <div style={{ ...mobileTrackBase, animation: 'orbit-cw 26s linear infinite' }}>
              {mobileInnerIcons.map(({ l, t, content }) => (
                <div key={content} style={{ ...chipBase, left: l, top: t, animation: 'chip-ccw 26s linear infinite', fontSize: 20, lineHeight: 1 }}>
                  {content}
                </div>
              ))}
            </div>
            <div style={{ ...mobileTrackBase, animation: 'orbit-ccw 38s linear infinite' }}>
              {mobileMidIcons.map(({ l, t, Icon, color }, i) => (
                <div key={i} style={{ ...chipBase, left: l, top: t, animation: 'chip-cw 38s linear infinite' }}>
                  <Icon size={18} style={{ color }} />
                </div>
              ))}
            </div>
            <div style={{ ...mobileTrackBase, animation: 'orbit-cw 54s linear infinite' }}>
              {mobileOuterIcons.map(({ l, t, Icon, color }, i) => (
                <div key={i} style={{ ...chipBase, left: l, top: t, animation: 'chip-ccw 54s linear infinite' }}>
                  <Icon size={18} style={{ color }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Desktop orbit (md+) — scales via --orbit-s CSS variable ─────────── */}
        <div className="hidden md:block" aria-hidden="true"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="orbit-wrap" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) scale(var(--orbit-s, 1))',
            width: 940, height: 940,
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 620, height: 620, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 65%)',
            }} />
            <div style={{ ...ringBase, width: 360, height: 360 }} />
            <div style={{ ...ringBase, width: 590, height: 590 }} />
            <div style={{ ...ringBase, width: 830, height: 830 }} />

            <div style={{ ...trackBase, animation: 'orbit-cw 26s linear infinite' }}>
              {innerIcons.map(({ l, t, content }) => (
                <div key={content} style={{ ...chipBase, left: l, top: t, animation: 'chip-ccw 26s linear infinite', fontSize: 20, lineHeight: 1 }}>
                  {content}
                </div>
              ))}
            </div>
            <div style={{ ...trackBase, animation: 'orbit-ccw 38s linear infinite' }}>
              {midIcons.map(({ l, t, Icon, color }, i) => (
                <div key={i} style={{ ...chipBase, left: l, top: t, animation: 'chip-cw 38s linear infinite' }}>
                  <Icon size={18} style={{ color }} />
                </div>
              ))}
            </div>
            <div style={{ ...trackBase, animation: 'orbit-cw 54s linear infinite' }}>
              {outerIcons.map(({ l, t, Icon, color }, i) => (
                <div key={i} style={{ ...chipBase, left: l, top: t, animation: 'chip-ccw 54s linear infinite' }}>
                  <Icon size={18} style={{ color }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-[600px] w-full text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent-muted)] px-3 py-1.5 rounded-full mb-6">
            <FiZap size={11} />
            Free to start — no credit card
          </div>

          <h1 className="text-[3.25rem] leading-[1.1] font-bold text-[var(--color-text)] tracking-tight mb-6">
            All your links,{' '}
            <span className="font-[var(--font-display)] italic font-normal text-[var(--color-accent)]">
              one beautiful page
            </span>
          </h1>

          <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-10">
            Create a stunning link page in minutes. Share it everywhere.
            Track every click with real analytics.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/auth/register"
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 h-12 rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] hover:-translate-y-px hover:shadow-md transition-all duration-150 active:scale-[0.98]">
              Create your page free <FiArrowRight size={15} />
            </Link>
            <a href="#pricing"
              className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] px-6 h-12 rounded-[var(--radius-lg)] font-medium text-sm hover:bg-[var(--color-surface-raised)] hover:border-[var(--color-border-strong)] transition-all duration-150">
              See pricing
            </a>
          </div>

          <p className="text-xs text-[var(--color-muted)] mt-5">
            Join thousands of creators. South African pricing in ZAR.
          </p>
        </div>

      </section>

      {/* Social proof */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-[1100px] mx-auto px-6 py-10">
          <div className="grid grid-cols-3 gap-8 max-w-[560px]">
            {[
              { stat: '10k+', label: 'Creators' },
              { stat: '500k+', label: 'Clicks tracked' },
              { stat: '50k+', label: 'Pages created' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-[var(--color-text)]">{stat}</p>
                <p className="text-sm text-[var(--color-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">How it works</p>
        <h2 className="text-3xl font-bold text-[var(--color-text)] tracking-tight mb-12">Up and running in 3 steps</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="text-5xl font-bold text-[var(--color-border)] leading-none mb-4 tabular-nums">{s.n}</p>
              <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-[1100px] mx-auto px-6 py-20">
          <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">Features</p>
          <h2 className="text-3xl font-bold text-[var(--color-text)] tracking-tight mb-12">
            Everything you need to grow
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title}
                className="p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:-translate-y-px transition-all duration-150 bg-[var(--color-bg)]">
                <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] flex items-center justify-center mb-4">
                  <f.icon className="text-[var(--color-accent)]" size={16} />
                </div>
                <h3 className="font-semibold text-[var(--color-text)] mb-1 text-sm">{f.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">Pricing</p>
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text)] tracking-tight">Simple, transparent pricing</h2>
          <p className="text-sm text-[var(--color-muted)] hidden md:block">Start free. Upgrade when ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {pricing.map((p) => (
            <div key={p.name}
              className={`relative rounded-[var(--radius-xl)] p-7 ${
                p.highlight
                  ? 'bg-[var(--color-accent)] text-white shadow-lg ring-1 ring-[var(--color-accent)]'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)]'
              }`}>
              {p.badge && (
                <span className={`absolute -top-3 left-6 text-xs font-semibold px-3 py-1 rounded-full ${
                  p.highlight ? 'bg-white text-[var(--color-accent)]' : 'bg-[var(--color-accent)] text-white'
                }`}>
                  {p.badge}
                </span>
              )}

              <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${p.highlight ? 'text-indigo-200' : 'text-[var(--color-muted)]'}`}>{p.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={`text-sm ${p.highlight ? 'text-indigo-200' : 'text-[var(--color-muted)]'}`}>{p.period}</span>
              </div>
              <p className={`text-sm mb-6 ${p.highlight ? 'text-indigo-200' : 'text-[var(--color-muted)]'}`}>{p.desc}</p>

              <ul className="space-y-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <FiCheck size={14} className={p.highlight ? 'text-indigo-200 flex-shrink-0' : 'text-[var(--color-accent)] flex-shrink-0'} />
                    <span className={p.highlight ? 'text-white' : 'text-[var(--color-text)]'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={p.href}
                className={`block text-center py-2.5 rounded-[var(--radius-lg)] font-semibold text-sm transition-all duration-150 ${
                  p.highlight
                    ? 'bg-white text-[var(--color-accent)] hover:bg-indigo-50'
                    : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                }`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-[720px] mx-auto px-6 py-20">
          <p className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-widest mb-4">About</p>
          <h2 className="text-3xl font-bold text-[var(--color-text)] tracking-tight mb-6">
            Built for South African creators
          </h2>
          <p className="text-[var(--color-muted)] leading-relaxed mb-4">
            TapToSee was built because existing link-in-bio tools were either too expensive,
            too limited, or too ugly. We made something fast, clean, and actually free to start.
          </p>
          <p className="text-[var(--color-muted)] leading-relaxed">
            Priced in ZAR because great tools should be accessible locally.
            No USD conversion surprises.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-2">Ready to get started?</h2>
            <p className="text-[var(--color-muted)] text-sm">Create your link page in under 60 seconds. Free forever.</p>
          </div>
          <Link to="/auth/register" className="flex-shrink-0 inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-6 h-12 rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] hover:-translate-y-px hover:shadow-md transition-all duration-150 active:scale-[0.98]">
            Create my page free <FiArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-[1100px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted)]">© {new Date().getFullYear()} TapToSee. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/auth/register" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-100">Sign up</Link>
            <Link to="/auth/login" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-100">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

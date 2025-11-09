import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [elevated, setElevated] = useState(false)

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all ${elevated ? 'backdrop-blur glass' : ''}`}>
      <nav className="section flex items-center justify-between py-4">
        <a href="#home" className="font-semibold tracking-tight text-white">
          <span className="text-brand-400">Saif</span> Portfolio
        </a>
        <div className="hidden md:flex gap-6">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-slate-300 hover:text-white transition-colors">
              {n.label}
            </a>
          ))}
        </div>
        <button className="md:hidden p-2 rounded hover:bg-white/5" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden section pb-4"
          >
            <div className="glass rounded-lg p-4 flex flex-col">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-slate-200 hover:text-white">
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


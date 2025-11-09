import { motion } from 'framer-motion'
import { profileData } from '@/data'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Hero() {
  const links = profileData.links || {}
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          {profileData.name || 'Your Name'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-lg md:text-xl text-slate-300"
        >
          {profileData.title || 'Your Role / Specialization'}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 flex gap-3">
          {links.github && (
            <a className="glass rounded px-3 py-2 inline-flex items-center gap-2 hover:bg-white/10" href={links.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
          )}
          {links.linkedin && (
            <a className="glass rounded px-3 py-2 inline-flex items-center gap-2 hover:bg-white/10" href={links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          )}
          {profileData.email && (
            <a className="glass rounded px-3 py-2 inline-flex items-center gap-2 hover:bg-white/10" href={`mailto:${profileData.email}`}>
              <Mail size={18} /> Email
            </a>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="glass rounded-2xl p-6">
          {profileData.photo && (
            <motion.img
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={profileData.photo}
              alt={profileData.name || 'Profile photo'}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mb-4 border border-white/10 shadow"
            />
          )}
          <p className="text-slate-300 leading-relaxed">
            {profileData.summary ||
              "I’m a developer focused on building delightful, performant user experiences with modern web technologies."}
          </p>
          <div className="mt-6 text-sm text-slate-400">
            <p>{profileData.location || 'Your City, Country'}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


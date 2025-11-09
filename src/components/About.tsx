import { motion } from 'framer-motion'
import { profileData } from '@/data'

export function About() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <h2 className="section-title mb-6">About</h2>
      <div className="glass rounded-xl p-6">
        <p className="text-slate-300 leading-relaxed">{profileData.summary}</p>
      </div>
    </motion.div>
  )
}


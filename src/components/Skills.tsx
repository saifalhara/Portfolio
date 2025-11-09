import { motion } from 'framer-motion'
import { profileData } from '@/data'

export function Skills() {
  const groups = profileData.skills || []
  return (
    <div>
      <h2 className="section-title mb-6">Skills</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {groups.map((g, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.03 }}
            className="glass rounded-xl p-5"
          >
            <h3 className="font-semibold mb-3">{g.category}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-200"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


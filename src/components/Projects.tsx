import { motion } from 'framer-motion'
import { profileData } from '@/data'

export function Projects() {
  const projects = profileData.projects || []
  return (
    <div>
      <h2 className="section-title mb-6">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
          <motion.a
            key={idx}
            href={p.link || '#'}
            target={p.link ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="glass rounded-xl p-5 hover:bg-white/10 transition"
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-slate-300 mt-2">{p.description}</p>
            {p.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.a>
        ))}
      </div>
    </div>
  )
}


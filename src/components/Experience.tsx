import { motion } from 'framer-motion'
import { profileData } from '@/data'

export function Experience() {
  const items = profileData.experience || []
  return (
    <div>
      <h2 className="section-title mb-6">Experience</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-px bg-white/10" />
        <div className="space-y-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative"
            >
              <div className="md:grid md:grid-cols-2 md:gap-10">
                <div className="md:text-right md:pr-10 mb-2">
                  <div className="text-sm text-slate-400">{item.period}</div>
                </div>
                <div className="glass rounded-xl p-5">
                  <h3 className="font-semibold">
                    {item.role} • <span className="text-brand-300">{item.company}</span>
                  </h3>
                  {item.description && <p className="text-slate-300 mt-2">{item.description}</p>}
                  {item.bullets && (
                    <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


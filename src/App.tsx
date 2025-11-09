import { motion } from 'framer-motion'
import { profileData } from './data'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="home" className="py-20 md:py-28 section">
          <Hero />
        </section>
        <motion.hr className="border-white/10" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
        <section id="about" className="py-16 section">
          <About />
        </section>
        <motion.hr className="border-white/10" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
        <section id="experience" className="py-16 section">
          <Experience />
        </section>
        <motion.hr className="border-white/10" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
        <section id="projects" className="py-16 section">
          <Projects />
        </section>
        <motion.hr className="border-white/10" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
        <section id="skills" className="py-16 section">
          <Skills />
        </section>
        <motion.hr className="border-white/10" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
        <section id="contact" className="py-16 section">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}


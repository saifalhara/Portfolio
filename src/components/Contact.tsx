import { profileData } from '@/data'
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, MessageCircle } from 'lucide-react'

export function Contact() {
  const links = profileData.links || {}
  const linkEntries = Object.entries(links)
  const name = profileData.name || 'there'

  const getLinkMeta = (key: string, value: string) => {
    const lower = key.toLowerCase()
    if (lower === 'github') {
      return { label: 'GitHub', href: value, Icon: Github }
    }
    if (lower === 'linkedin') {
      return { label: 'LinkedIn', href: value, Icon: Linkedin }
    }
    if (lower === 'whatsapp') {
      const base = value.startsWith('http') ? value : `https://wa.me/${value}`
      const url = new URL(base)
      if (!url.searchParams.has('text')) {
        url.searchParams.set('text', `Hello ${name}! I found your portfolio and would like to connect.`)
      }
      return { label: 'WhatsApp', href: url.toString(), Icon: MessageCircle }
    }
    return { label: key, href: value, Icon: LinkIcon }
  }
  return (
    <div>
      <h2 className="section-title mb-6">Contact</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5 space-y-3">
          {profileData.email && (
            <a href={`mailto:${profileData.email}`} className="flex items-center gap-3 hover:text-white text-slate-300">
              <Mail size={18} /> {profileData.email}
            </a>
          )}
          {profileData.phone && (
            <a href={`tel:${profileData.phone}`} className="flex items-center gap-3 hover:text-white text-slate-300">
              <Phone size={18} /> {profileData.phone}
            </a>
          )}
          {profileData.location && (
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin size={18} /> {profileData.location}
            </div>
          )}
        </div>
        <div className="glass rounded-xl p-5 space-y-2">
          {linkEntries.length > 0 ? (
            linkEntries.map(([k, v]) => {
              const { label, href, Icon } = getLinkMeta(k, String(v))
              return (
                <a key={k} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white text-slate-300">
                  <Icon size={18} /> {label}
                </a>
              )
            })
          ) : (
            <div className="text-slate-400">Add your social links to appear here.</div>
          )}
        </div>
      </div>
    </div>
  )
}


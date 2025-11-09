import sample from './sample.json'
import generated from './generated.json'

export type Profile = {
  name: string
  title: string
  summary: string
  location?: string
  email?: string
  phone?: string
  links?: Record<string, string>
  photo?: string
  skills?: Array<{ category: string; items: string[] }>
  experience?: Array<{ company: string; role: string; period: string; description?: string; bullets?: string[] }>
  projects?: Array<{ name: string; description: string; link?: string; tags?: string[] }>
  education?: Array<{ school: string; degree: string; period?: string; details?: string }>
}

function isNonEmptyObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && Object.keys(value as object).length > 0
}

export const profileData: Profile = (isNonEmptyObject(generated) ? (generated as Profile) : (sample as Profile))


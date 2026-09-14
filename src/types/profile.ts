export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  title: string
  avatar: string
  bio: string
  socialLinks: SocialLink[]
}

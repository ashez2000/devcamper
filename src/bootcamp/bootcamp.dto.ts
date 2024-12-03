export interface CreateBootcampDto {
  name: string
  description: string
  slug?: string
  website?: string
  phone?: string
  email?: string
  address?: string
  careers?: string[]
  photo?: string
  housing?: boolean
  jobAssistance?: boolean
  jobGuarantee?: boolean
  acceptGi?: boolean
  user: string
}

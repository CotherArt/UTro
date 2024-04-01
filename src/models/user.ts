export interface UserType {
  profile: Profile
  authentication: Authentication
  _id: string
  username: string
  email: string
}

export interface Profile {
  birthDate: string
  fullName: string
  img: string
  phoneNumber: string
  sex: string
}

export interface Authentication {
  role: 'Administrator' | 'User' | 'Moderator' | 'Guest'
}

export type Event = {
  id: string
  user: UserProps
  name: string
  description: string
  location: string
  latitude: string
  longitude: string
  date: string
  imageUrl: string
  tags: string[]
}

type UserProps = {
  userId: string
  name: string
}
import { useContext } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'

export function useAvatar(type: AvatarType) {
  const { avatars } = useAppwrite()
}
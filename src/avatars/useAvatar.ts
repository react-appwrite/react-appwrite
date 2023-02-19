import { useContext } from 'react'
import { useAppwrite } from '..'

export function useAvatar(type: AvatarType) {
  const { avatars } = useAppwrite()
}
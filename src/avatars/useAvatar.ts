import { useContext } from 'react'
import { AppwriteContext } from '../context'

export function useAvatar(type: AvatarType) {
  const { avatars } = useContext(AppwriteContext)
}
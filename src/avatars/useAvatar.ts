'use client'

import { useContext } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'
import type { AvatarType } from './types'

export function useAvatar(type: AvatarType) {
  const { avatars } = useAppwrite()
}
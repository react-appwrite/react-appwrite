'use client'

import { useAvatar } from 'react-appwrite/avatars'
import { User } from '../types'

function Avatar(user?: Partial<User>) {
  const avatar = useAvatar({
    type: 'initials',
    name: user?.name,
    dimensions: {
      width: 30,
      height: 30,
    },
  })

  return (
    <div className={`w-[30px] h-[30px] bg-gray-300 rounded-full ${avatar.isLoading ? 'animate-pulse' : ''}`}>
      {
        avatar.data &&
        <img
          className="bg-gray-300 rounded-full"
          src={avatar.data?.href}
          width={30}
          height={30}
        />
      }
    </div>
  )
}

export { Avatar }
'use client'

import { useAccount, useAvatar } from 'react-appwrite-hooks'

export default function AccountPage() {
  const { data: account } = useAccount()
  const { data: avatar, isFetching } = useAvatar({
    type: 'initials',
    name: account?.name,
    dimensions: {
      width: 50,
      height: 50,
    },
  })

  return (
    <div>
      <p>
        {account?.$id}
      </p>

      <img
        src={avatar?.href}
      />
    </div>
  )
}
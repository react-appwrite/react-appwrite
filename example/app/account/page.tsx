'use client'

import { useAccount } from 'react-appwrite-hooks'

export default function AccountPage() {
  const account = useAccount()

  return (
    <p>
      {account?.data?.$id}
    </p>
  )
}
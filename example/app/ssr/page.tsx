import { appwrite } from '../../util'
import { cookies } from 'next/headers'
import { User } from './User'
import { Models } from 'appwrite'

export default async function SsrPage() {
  const account = await appwrite.getUser(cookies())

  if (!account) {
    return (
      <span>
        You are not logged in.
      </span>
    )
  }

  return (
    <User
      account={account}
    />
  )
}
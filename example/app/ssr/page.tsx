import { appwrite } from '../../util'
import { cookies } from 'next/headers'
import { User } from './User'
import { Models } from 'appwrite'

export default async function SsrPage() {
  const user = await appwrite.getUser(cookies())

  if (!user) {
    return (
      <span>
        You are not logged in.
      </span>
    )
  }

  return (
    <User
      {...user}
    />
  )
}
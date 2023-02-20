import { appwrite } from '../../util'
import { cookies } from 'next/headers'
import { User } from './User'

export default async function SsrPage() {
  const account = await appwrite.getAccount(cookies())

  return (
    <span>
      {
        account
          ? <User
            account={account}
          />
          : <>
            You are logged out
          </>
      }
    </span>
  )
}
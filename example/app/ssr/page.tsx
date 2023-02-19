import { getAccount } from 'react-appwrite-hooks/next'
import { appwriteConfiguration } from '../../util'
import { cookies } from 'next/headers'

export default async function SsrPage() {
  const token = cookies().get('a_session_test_legacy')?.value ?? ''
  const account = await getAccount(appwriteConfiguration, token)

  return (
    <span>
      {
        account
          ? `Logged in as ${account.$id}`
          : 'You are logged out'
      }
    </span>
  )
}
'use client'

import { Avatar } from './Avatar'
import { useAccount, useSignOut } from 'react-appwrite/account'
import Link from 'next/link'

function NavBar() {
  const { data: account, isLoading } = useAccount()
  const signOut = useSignOut()

  return (
    <nav
      className="flex items-center bg-gray-100 h-14"
    >
      <div className="container flex items-center">
        <Link
          href="/"
        >
          Home
        </Link>

        <div className="ml-auto">
          {
            account || isLoading
              ?
              <button
                disabled={!account || isLoading}
                type="button"
                className="flex items-center gap-3 rounded-full"
                onClick={() => signOut.mutate()}
              >
                <Avatar {...account} />
              </button>

              : <Link
                href={'/auth'}
                className="success button"
              >
                Sign In
              </Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default NavBar
'use client'

import { Models } from 'appwrite'
import { useAccount } from 'react-appwrite-hooks/account'
import { useAvatar } from 'react-appwrite-hooks/avatars'

type Props<Preferences extends Models.Preferences> = Models.Account<Preferences>

function User<Preferences extends Models.Preferences>(props: Props<Preferences>) {
  const { data: account } = useAccount(props)
  const { data: avatar } = useAvatar({
    type: 'card',
    code: 'amex',
  })

  console.log({ avatar })

  return (
    <div>
      <img
        src={avatar?.href}
      />

      <p>
        Logged in as {account!.name}
      </p>
    </div>
  )
}

export { User }
'use client'

import { Models } from 'appwrite'
import { useAccount } from 'react-appwrite-hooks/account'

type Props<Preferences extends Models.Preferences> = {
  account: Models.Account<Preferences>,
}

function User<Preferences extends Models.Preferences>(props: Props<Preferences>) {
  const { data: account } = useAccount(props.account)

  return (
    <span>
      Logged in as {account!.name}
    </span>
  )
}

export { User }
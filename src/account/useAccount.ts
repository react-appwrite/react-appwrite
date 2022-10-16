import type { Models } from 'appwrite'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AppwriteContext } from '../context'
import { usePromiseEffect } from '../hooks/usePromiseEffect'

export function useAccount<Preferences extends Models.Preferences>() {
  const { account: accountService } = useContext(AppwriteContext)
  const result = usePromiseEffect(async () => accountService.get<Preferences>())
  const [account] = result

  useEffect(() => {
    if (account) {
      console.log("The account is", account)
    }
  }, [account])

  return result
}
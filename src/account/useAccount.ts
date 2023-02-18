import type { Models } from 'appwrite'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { AppwriteContext } from '../context'

export function useAccount<Preferences extends Models.Preferences>(
  options?: UseQueryOptions<Models.Account<Preferences>, unknown, Models.Account<Preferences>, string[]>
) {
  const { account: accountService } = useContext(AppwriteContext)
  const queryResult = useQuery({
    queryKey: ['appwrite', 'account'],
    queryFn: () => accountService.get<Preferences>(),

    ...options,
  })

  return queryResult
}
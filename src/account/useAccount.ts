import type { Models } from 'appwrite'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useAppwrite } from 'react-appwrite-hooks'

export function useAccount<Preferences extends Models.Preferences>(
  options?: UseQueryOptions<Models.Account<Preferences>, unknown, Models.Account<Preferences>, string[]>
) {
  const { account } = useAppwrite()
  const queryResult = useQuery({
    queryKey: ['appwrite', 'account'],
    queryFn: () => account.get<Preferences>(),

    refetchOnMount: false,
    refetchOnWindowFocus: false,

    ...options,
  })

  return queryResult
}
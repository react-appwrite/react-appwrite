'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import type { Models } from 'appwrite'
import produce, { castDraft } from 'immer'
import { useEffect } from 'react'
import { isAppwriteError, useAppwrite } from 'react-appwrite'
import { defaultQueryOptions } from 'react-appwrite/query'

const queryKey = ['appwrite', 'account']

/**
 * Access to the local user's account.
 * @param account The initial account object, obtained from SSR.
 * @param options Options to pass to `react-query`
 */
export function useAccount<Preferences extends Models.Preferences>(
  account?: Models.Account<Preferences>,
  options?: UseQueryOptions<Models.Account<Preferences> | null, unknown, Models.Account<Preferences> | null, string[]>
) {
  const { account: accountService } = useAppwrite()
  const queryClient = useQueryClient()

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        return await accountService.get<Preferences>()
      }

      catch (error) {
        if (isAppwriteError(error) && error.code === 401) {
          return null
        }

        throw error
      }
    },

    // Should be initialData, but it's causing problems with SSR.
    placeholderData: account,

    ...options,
  })

  useEffect(() => {
    const unsubscribe = accountService.client.subscribe('account', response => {
      const isUpdatingPreferences = response.events.some(event => event.endsWith('prefs'))

      if (isUpdatingPreferences) {
        queryClient.setQueryData<Models.Account<Preferences>>(queryKey, account => produce(account, draft => {
          if (draft) {
            draft.prefs = castDraft(response.payload as Preferences)
          }
        }))

        return
      }

      queryClient.setQueryData(queryKey, response.payload)
    })

    return unsubscribe
  }, [queryKey])

  return queryResult
}
import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import type { Models } from 'appwrite'
import produce, { castDraft } from 'immer'
import { useEffect } from 'react'
import { useAppwrite } from 'react-appwrite-hooks'

export function useAccount<Preferences extends Models.Preferences>(
  options?: UseQueryOptions<Models.Account<Preferences>, unknown, Models.Account<Preferences>, string[]>
) {
  const { account: accountService } = useAppwrite()
  const queryClient = useQueryClient()
  const queryResult = useQuery({
    queryKey: ['appwrite', 'account'],
    queryFn: () => accountService.get<Preferences>(),

    ...options,
  })

  useEffect(() => {
    const unsubscribe = accountService.client.subscribe('account', response => {
      const isUpdatingPreferences = !!response.events.find(event => event.endsWith('prefs'))

      if (isUpdatingPreferences) {
        queryClient.setQueryData<Models.Account<Preferences>>(['appwrite', 'account'], account => produce(account, draft => {
          if (draft) {
            draft.prefs = castDraft(response.payload as Preferences)
          }
        }))

        return
      }

      queryClient.setQueryData(['appwrite', 'account'], response.payload)
    })

    return unsubscribe
  }, [])

  return queryResult
}
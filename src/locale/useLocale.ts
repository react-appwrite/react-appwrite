'use client'

import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useAppwrite } from 'react-appwrite'
import { useAccount } from 'react-appwrite/account'

const queryKey = ['appwrite', 'account', 'locale']

/**
 * Access to the local user's locale.
 * @param options Options to pass to `react-query`.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/locale?sdk=web-default#localeGet)
 */
export function useLocale(
  options?: UseQueryOptions<Models.Locale, unknown, Models.Locale, string[]>
) {
  const { locale } = useAppwrite()
  const { data: account } = useAccount()
  const queryResult = useQuery({
    enabled: !!account,
    queryKey,
    queryFn: async () => await locale.get(),

    ...options,
  })

  return queryResult
}
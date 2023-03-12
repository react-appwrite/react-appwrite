'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import { useAccount } from 'react-appwrite/account'

const queryKey = ['appwrite', 'account', 'locale', 'countries']

/**
 * Access to a list of all countries.
 * @param options Options to pass to `react-query`.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/locale?sdk=web-default#localeListCountries)
 */
export function useCountries(
  options?: UseQueryOptions<Models.Country[], unknown, Models.Country[], string[]>
) {
  const { locale: localeService } = useAppwrite()
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await localeService.listCountries()

      return response.countries
    },

    cacheTime: Infinity,

    ...options,
  })

  return queryResult
}
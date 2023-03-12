'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import { useAccount } from 'react-appwrite/account'

const queryKey = ['appwrite', 'locale', 'countries', 'phones']

/**
 * Access to a list of all countries' phone codes.
 * @param options Options to pass to `react-query`.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/locale?sdk=web-default#localeListCountriesPhones)
 */
export function useCountriesPhoneCodes(
  options?: UseQueryOptions<Models.Phone[], unknown, Models.Phone[], string[]>
) {
  const { locale: localeService } = useAppwrite()
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await localeService.listCountriesPhones()

      return response.phones
    },

    cacheTime: Infinity,

    ...options,
  })

  return queryResult
}
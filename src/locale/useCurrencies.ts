'use client'

import { useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query'
import { Models } from 'appwrite'
import { useMemo } from 'react'
import { useAppwrite } from 'react-appwrite'
import { useAccount } from 'react-appwrite/account'

const queryKey = ['appwrite', 'locale', 'currencies']

/**
 * Access to a list of all currencies.
 * @param options Options to pass to `react-query`.
 * @link [Appwrite Documentation](https://appwrite.io/docs/client/locale?sdk=web-default#localeListCurrencies)
 */
export function useCurrencies(
  options?: UseQueryOptions<Models.Currency[], unknown, Models.Currency[], string[]>
) {
  const { locale: localeService } = useAppwrite()
  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await localeService.listCurrencies()

      return response.currencies
    },

    cacheTime: Infinity,

    ...options,
  })

  return queryResult
}
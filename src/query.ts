import type { MutationObserverOptions, QueryKey, QueryObserverOptions } from '@tanstack/react-query'

export const defaultQueryOptions: QueryObserverOptions<unknown, unknown, unknown, unknown, QueryKey> = {
  staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: false,
}

export const defaultMutationOptions: MutationObserverOptions<unknown, unknown, unknown, unknown> = {
  retry: false,
}
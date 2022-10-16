import { useMemo, useReducer } from 'react'
import type { LoadingAction, LoadingResult } from '../types'

export function useLoadingReducer<T>() {
  const [[data, loading, error], dispatch] = useReducer(
    (
      [data, loading, error]: LoadingResult<T>, action: LoadingAction<T>
    ): LoadingResult<T> => {
      switch (action.type) {
        case 'loading':
          return [data, action.state, error]
        case 'success':
          return [action.data, false, null]
        case 'update':
          return [action.data, true, null]
        case 'error':
          // @ts-ignore
          return [null, false, action.error]
        default:
          return [data, loading, error]
      }
    }, [undefined, false, undefined]
  )

  return useMemo(
    () => (
      {
        state: {
          data,
          loading,
          error,
        },

        dispatch,
      }
    ),
    (
      [
        data,
        loading,
        error,
      ]
    )
  )
}
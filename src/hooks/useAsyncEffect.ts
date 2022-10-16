import { useEffect, useMemo, useReducer, type Dispatch } from 'react'
import type { LoadingAction, LoadingResult } from '../types'
import { useLoadingReducer } from './useLoadingReducer'

export function useAsyncEffect<T>(
  effect: (dispatch: Dispatch<LoadingAction<T>>) => any,
): LoadingResult<T> {
  const { state, dispatch } = useLoadingReducer<T>()
  const { data, loading, error } = state

  useEffect(() => {
    effect(dispatch)
  }, [])

  return useMemo(() => [data, loading, error], [data, loading, error])
}
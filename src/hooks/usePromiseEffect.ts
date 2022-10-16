import { useEffect, useMemo, useReducer, type Dispatch } from 'react'
import type { LoadingAction, LoadingResult } from '../types'
import { useAsyncEffect } from './useAsyncEffect'

export function usePromiseEffect<T>(
  effect: (...args: any[]) => Promise<T>,
) {
  const state = useAsyncEffect<T>(async dispatch => {
    dispatch({
      type: 'loading',
      state: true,
    })

    try {
      dispatch({
        type: 'success',
        data: await effect()
      })
    }

    catch (error: unknown) {
      dispatch({
        type: 'error',
        error: error as string,
      })
    }

    finally {
      dispatch({
        type: 'loading',
        state: false,
      })
    }
  })

  return useMemo(() => state, [state])
}
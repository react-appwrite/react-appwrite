import { useState, useEffect } from 'react'
import type { AsyncEffectResult, AsyncEffectCallback, Loading } from './types'

export function useAsyncResult<T>(effect: AsyncEffectCallback<T>): AsyncEffectResult<T> {
  const [data, setData] = useState<Loading<T>>(undefined)
  const [error, setError] = useState<any | undefined>(undefined)

  useEffect(() => effect(setData, setError), [])

  return [data, data === undefined && error !== undefined, error]
}
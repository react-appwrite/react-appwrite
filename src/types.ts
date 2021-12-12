
import type { Models } from 'appwrite/types/sdk'

export type Loading<T> = T | undefined
export type AsyncEffectResult<T> = [Loading<T>, boolean, unknown]

export type AsyncEffectCallback<T> = (
  set: (data: T) => void,
  error: (error: unknown) => void,
  currentState: Loading<T>,
) => void | (() => void)

export type CloudFunctionExecution<Data> = Models.Execution & {
  data: Data,
}

export type CloudFunction<Data, ReturnData> = {
  execute: (data?: Data) => void,
  execution?: CloudFunctionExecution<ReturnData>,
}
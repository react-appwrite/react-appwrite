import type { Appwrite, Models } from 'appwrite/types/sdk'
import type { AsyncEffectResult } from '../types'
import { useAsyncResult } from '../util'

export type UseAccountResult<Preferences> = AsyncEffectResult<Models.User<Preferences>>

export default function useAccount<Preferences>(appwrite: Appwrite): UseAccountResult<Preferences> {
  return useAsyncResult<Models.User<Preferences>>((set, error) => {
    appwrite
      .account
      .get()
      // @ts-ignore
      .then(set)
      .catch(error)

    return appwrite.subscribe('account', e => {
      set(e.payload as Models.User<Preferences>)
    })
  })
}
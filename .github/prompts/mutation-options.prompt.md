---
mode: agent
model: GPT-5 (openai)
description: Add options parameter to mutations
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'appwrite-docs/*', 'fetch']
---
Your goal is to add an `options` parameter to all mutation hooks you encounter in the folder the user specifies. You should identify files as mutations if their file name contains "create", "update", or "delete".

Requirements for the `options` parameter:
* It should be typed as a `AppwriteMutationOptions`
* The first generic type parameter of `AppwriteMutationOptions` should be the same as the first generic type parameter of the `useMutation` call
* The second generic type parameter of `AppwriteMutationOptions` should be the `Props` of the mutation, if it has one defined. If `Props` relies on generic type parameters, those should be passed in as well.

You should then spread those `options` at the bottom of the `useMutation` call.

Here is an example of an options parameter being added to a mutation hook:

```typescript
import { type AppwriteMutationOptions, useAppwrite } from '../index'
import { type Models, ID, type AppwriteException } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  name: string,
  roles?: string[],
  teamId?: string,
}

export function useCreateTeam<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>(options: AppwriteMutationOptions<Models.Team<Preferences>, Props>) {
  const { teams } = useAppwrite()

  return useMutation<Models.Team<Preferences>, AppwriteException, Props>({
    mutationFn: ({ name, roles, teamId }) => {
      return teams.create<Preferences>({
        name,
        roles,
        teamId: teamId ?? ID.unique(),
      })
    },

    ...options,
  })
}
```
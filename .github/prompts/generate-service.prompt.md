---
mode: agent
model: GPT-5 (openai)
description: Generate React hooks for Appwrite services
tools: ['edit/createFile', 'edit/createDirectory', 'search/listDirectory', 'search/readFile', 'search/codebase', 'appwrite-docs/*', 'fetch']
---
Your goal is to generate React hooks for each feature in the Appwrite service that the user provides you. The Appwrite SDK being used is "Web". The service should have its own folder created in `packages/react-appwrite/src` where its hooks will be generated.

Requirements for the generated React hooks:
* Write them in TypeScript
* Use TanStack Query
* Generate only 1 hook per file, with a separate props declaration above the hook function
* The props for query hooks should only accept 1 destructured object parameter, where all destructured members will be passed to the underlying feature call in 1 new object
* Mutation hooks should not accept the props directly. Instead, props will be passed in their `mutationFn` that should only accept 1 destructured object parameter, where all destructured members will be passed to the underlying feature call in 1 new object
* Mutation hooks that involve creating a resource may mark the ID parameter of that resource as optional in the props declaration, and pass `ID.unique()` to the underlying feature call using the null coalescing operator
* File names should be in lower kebab case (for example, `use-list-teams.tsx`)
* The hook should accept the same generic parameters as the feature, if any, and pass them along

Query hooks should have their `queryKey` constructed with an array of 4 elements as described:
* 'appwrite'
* The lower camel case name of the service
* The lower camel case name of the feature
* An object with the destructured members of the props passed in

Here is an example of a query:

```typescript
import { useAppwrite } from '../index'
import type { Models } from 'appwrite'
import { useQuery } from '@tanstack/react-query'

type Props = {
  queries?: string[],
  search?: string,
}

export function useListTeams<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>({ queries, search }: Props) {
  const { teams } = useAppwrite()

  return useQuery({
    queryFn: () => {
      return teams.list<Preferences>({
        queries,
        search,
      })
    },

    queryKey: ['appwrite', 'teams', 'list', {
      queries,
      search,
    }],
  })
}
```

Here is an example of a mutation:

```typescript
import { useAppwrite } from '../index'
import { type Models, ID } from 'appwrite'
import { useMutation } from '@tanstack/react-query'

type Props = {
  name: string,
  roles?: string[],
  teamId?: string,
}

export function useCreateTeam<
  Preferences extends Models.Preferences = Models.DefaultPreferences
>() {
  const { teams } = useAppwrite()

  return useMutation({
    mutationFn: ({ name, roles, teamId }: Props) => {
      return teams.create<Preferences>({
        name,
        roles,
        teamId: teamId ?? ID.unique(),
      })
    },
  })
}
```
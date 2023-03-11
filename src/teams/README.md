# Team Hooks

## useTeam

```tsx
import { useTeam } from 'react-appwrite/teams'

function ModeratorCount() {
  const teamId = 'moderators'
  const { data: moderators } = useTeam(teamId)

  return (
    <span>
      {moderators?.total ?? '-'} total moderators
    </span>
  )
}
```

---

## useTeamMembers

```tsx
import { useTeamMembers } from 'react-appwrite/teams'

function ModeratorList() {
  const teamId = 'moderators'
  const { data: moderatorMemberships } = useTeamMembers(teamId)

  return (
    <ol>
      {
        moderatorMemborships?.map(moderatorMembership => (
          <li
            key={moderatorMembership.$id}
          >
            {moderatorMembership.userName}
          </li>
        ))
      }
    </ol>
  )
}
```
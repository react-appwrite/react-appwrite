# Avatar Hooks

➡️ [Appwrite Documentation](https://appwrite.io/docs/client/avatars)

## useAvatar

```tsx
import { useAvatar } from 'react-appwrite/avatars'

function MyAvatar() {
  const { data: account } = useAccount<Preferences>()
  const { data: avatar } = useAvatar({
    type: 'initials',
    name: account?.name,
    dimensions: {
      width: 50,
      height: 50,
    },
  })

  return (
    <img
      src={avatar?.href}
    />
  )
}
```
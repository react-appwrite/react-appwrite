# Account Hooks

## useAccount

```typescript
import { useAccount } from 'react-appwrite-hooks/account'

// In your component.
const { data: account } = useAccount<Preferences>()
```

`account` is a [user object](https://appwrite.io/docs/models/user).

---

## useEmailSignIn

```typescript
import { useEmailSignIn } from 'react-appwrite-hooks/account'

// In your component.
const signIn = useEmailSignIn()

const session = await signIn.mutateAsync({
  email: 'test@example.com',
  password: 'Appwrite123!',
})
```

`session` is a [session object](https://appwrite.io/docs/models/session).

## useEmailSignUp

```typescript
import { useEmailSignUp } from 'react-appwrite-hooks/account'

// In your component.
const signUp = useEmailSignUp()

const account = await signUp.mutateAsync({
  email: 'test@example.com',
  password: 'Appwrite123!',
})
```
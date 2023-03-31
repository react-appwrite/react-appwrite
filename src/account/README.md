# Account Hooks

➡️ [Appwrite Documentation](https://appwrite.io/docs/client/account)

## useAccount

```tsx
import { useAccount } from 'react-appwrite/account'

type Preferences = {
  darkMode?: boolean,
}

function Component() {
  const { data: account, isLoading } = useAccount<Preferences>()

  if (account) {
    return <p>Signed in as {account.name}</p>
  }

  if (isLoading) {
    return <p>Loading</p>
  }

  return <p>You are signed out</p>
}
```

---

## useEmailSignIn

```tsx
import { useEmailSignIn } from 'react-appwrite/account'

function SignInButton() {
  const signIn = useEmailSignIn()

  return (
    <button
      onClick={() => {
        signIn.mutateAsync({
          email: 'test@example.com',
          password: 'Appwrite123!',
        })
      }}
    >
      Sign In
    </button>
  )
}
```

---

## useEmailSignUp

```tsx
import { useEmailSignUp } from 'react-appwrite/account'

function SignUpButton() {
  const signUp = useEmailSignUp()

  return (
    <button
      onClick={() => {
        signUp.mutateAsync({
          email: 'test@example.com',
          password: 'Appwrite123!',
        })
      }}
    >
      Sign Up
    </button>
  )
}
```

---

## useOAuth2SignIn

```tsx
import { useOAuth2SignIn } from 'react-appwrite/account'

function GoogleSignIn() {
  const signIn = useOAuth2SignIn()

  const provider = 'google'
  const successUrl = 'https://example.com/auth'
  const failureUrl = 'https://example.com/auth/fail'

  return (
    <button
      onClick={() => {
        signIn.mutateAsync({
          provider,
          successUrl,
          failureUrl,
        })
      }}
    >
      Sign In With Google
    </button>
  )
}
```

---

## useAnonymousSignIn

```tsx
import { useAnonymousSignIn } from "react-appwrite/account"

function SignInButton() {
  const anonymousSignIn = useAnonymousSignIn()

  return (
    <button
      onClick={() => {
        anonymousSignIn.mutate()
      }}
    >
      Anonymous Sign In
    </button>
  );
}
```

---

## useSignOut

```tsx
import { useSignOut } from 'react-appwrite/account'

function SignOutButton() {
  const signOut = useSignOut()

  return (
    <button
      onClick={() => {
        signOut.mutateAsync()
      }}
    >
      Sign Out
    </button>
  )
}
```
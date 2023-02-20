# Next.js

Create an instance of `AppwriteNextServer`.

```typescript
import { AppwriteNextServer } from 'react-appwrite-hooks/next'

export const appwrite = new AppwriteNextServer({
  url: process.env.APPWRITE_URL,
  projectId: process.env.APPWRITE_PROJECT_ID,
  key: process.env.APPWRITE_KEY,
})
```

## Middleware

```typescript
export const middleware = appwrite.authMiddleware(request => {
  if (!request.user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  return NextResponse.next()
})
```

## Server Components

```typescript
import { cookies } from 'next/headers'

export default async function MyServerComponent() {
  const user = await appwrite.getUser(cookies())

  // You can also pass it to a client component and call `useAccount(user)` there.

  return (
    user
      ?
        <span>
          Logged in as {user.name}
        </span>
      :
        <span>
          You are not logged in.
        </span>
  )
}
```


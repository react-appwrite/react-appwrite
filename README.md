<div
  align="center"
>
  <img
    alt="React logo"
    width="100"
    src="docs/logos/react.svg"
  />

  <img
    alt="Appwrite logo"
    width="300"
    src="docs/logos/appwrite.svg"
  />

  <p>
    Gorgeous library for integrating React with Appwrite.
  </p>

  <p align="center">
    <a href="https://www.npmjs.com/package/react-appwrite" alt="Latest npm version">
        <img alt="Latest npm version" src="https://img.shields.io/npm/v/react-appwrite?color=blue"></a>
    <a href="https://github.com/sanny-io/react-appwrite/blob/main/LICENSE" alt="MIT license">
        <img alt="MIT license" src="https://img.shields.io/github/license/sanny-io/react-appwrite?color=success" /></a>
    <a href="https://github.com/sanny-io/react-appwrite/issues" alt="GitHub issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/sanny-io/react-appwrite" />
        </a>
</p>
</div>

---

## Features

✅ Realtime updates for everything

✅ Next.js middleware support

✅ React Server Components (RSC) support

✅ Optimized for performance with minimal re-renders

✅ Incredibly simple API

✅ Fully typed, written 100% in TypeScript

✅ Eventual feature parity with the Appwrite SDK

## Supported Services

This library is a work in progress. The intent is to eventually reach 100% feature parity with Appwrite.

- [Account](/src/account)
- [Avatars](/src/avatars)
- [Database](/src/database)
- [Functions](/src/functions)
- [Locale](/src/locale)
- [Next.js](/src/next)
- [Storage](/src/storage)
- [Teams](/src/teams)

### Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

### Installation

```
npm i react-appwrite appwrite
```

### Configuration

```tsx
import { Client } from 'appwrite'
import { AppwriteProvider } from 'react-appwrite'

const appwrite = new Client().setEndpoint('https://my-appwrite-url.com')
  .setProject('myAppwriteProjectId')

function App() {
  return (
    <AppwriteProvider
      client={appwrite}
    >
      {
        // ...
      }
    </AppwriteProvider>
  )
}
```

This library is powered by [react-query](https://tanstack.com/query/v4/docs/react/reference/useQuery).
Hooks follow this format.

```typescript
const { data, isLoading } = useHook(...)
```

### Contributing

> **Note**
> We're looking for maintainers! [Leave a comment](https://github.com/sanny-io/react-appwrite/discussions/1) if you'd like to help out.

Follow these steps to get started with local development.

1. Clone the repository.

```
git clone https://github.com/sanny-io/react-appwrite.git
cd react-appwrite
```

2. Install dependencies.

```
npm i
```

3. Execute the development script.

```
npm run dev
```

Follow these extra steps if you'd like to test with the provided example
project.

1. In another terminal, navigate to the `example` directory.

```
cd example
```

2. Create your `.env` file.

```
cp .env.example .env
```

3. Replace the environment variables in `.env` with your own.

4. Install dependencies.

```
npm i
```

5. Execute development script.

```
npm run dev
```

### License

[MIT](/LICENSE)

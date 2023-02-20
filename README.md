# react-appwrite-hooks

Gorgeous library for integrating React with Appwrite.

## Features

✅ Realtime updates for everything

✅ Next.js middleware support

✅ React Server Components (RSC) support

✅ Optimized for performance with minimal re-renders

✅ Incredibly simple API

✅ Fully typed, written 100% in TypeScript

✅ Eventual feature parity with the Appwrite SDK

This library is powered by [react-query](https://tanstack.com/query/latest).
Hooks follow this format.

```typescript
const { data, isLoading } = useHook(...)
```

### Supported Services

This library is a work in progress. The intent is to eventually reach 100% feature parity with Appwrite.

- [Account](/src/account)
- [Avatars](/src/avatars)
- [Database](/src/database)
- [Functions](/src/functions)
- [Next.js](/src/next)
- [Storage](/src/storage)
- [Teams](/src/teams)

### Contributing

1. Install `pnpm` if you don't already have it by running `npm install -g pnpm`

2. Install dependencies with `pnpm i`

3. Execute `pnpm run dev` in the root folder and start editing.

Follow these extra instructions if you'd like to test with the provided example
project.

1. In the example folder, rename `.env.example` to `.env`, and
   replace the variables inside of it with variables from your own local
   Appwrite installation.

2. Open up another terminal that is also in the example folder.

3. Install dependencies with `pnpm i`

4. Execute `pnpm run dev` and start editing.

### License

[MIT](/LICENSE)

# react-appwrite-hooks

React hooks for [Appwrite](https://appwrite.io). This library is a work-in-progress (as is Appwrite), and was inspired by [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks). Expect bugs, missing functionality, and outdated docs as this project continues to be developed.

Unless stated otherwise, all hooks support realtime capabilities, so you don't have to do any manual refreshing yourself.

The hooks follow this format:

```typescript
const [value, isLoading, error] = useHook(appwrite, ...)
```

All hooks take your appwrite instance as their first parameter.

### Available Hooks

- [Account](/src/account)
- [Database](/src/database)
- [Functions](/src/functions)

### Contributing

1. Install `pnpm` if you don't already have it by running `npm install -g pnpm`

2. Install dependencies with `pnpm i`

3. Execute `pnpm run dev` in the root folder and start editing.

Follow these extra instructions if you'd like to test with the provided example project.

1. In the example folder, rename `.env.local.example` to `.env.local`, and replace the variables inside of it with variables from your own local Appwrite installation.

2. Open up another terminal that is also in the example folder.

3. Install dependencies with `pnpm i`

4. Execute `pnpm run dev` and start editing.

### License

[MIT](/LICENSE)
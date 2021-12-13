# react-appwrite-hooks

React hooks for [Appwrite](https://appwrite.io). This library is a work-in-progress (as is Appwrite), and was inspired by [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks). Expect bugs, missing functionality, and outdated docs as this project continues to be developed.
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

1. [Install `pnpm` if you don't already have it.](https://pnpm.io/installation#nodejs-is-preinstalled)

2. Install dependencies for both the library and the example project inside of it

`pnpm i && cd example && pnpm i && cd ..`

3. Rename `.env.local.example` to `.env.local`, and replace the variables inside of it with variables from your own local Appwrite installation.

4. Execute `pnpm run dev` in the root folder, and start editing files in the src folder. If you'd like to test your changes with the provided example project, open up another terminal, cd into the example folder, and run `pnpm run dev` there as well.

### License

[MIT](/LICENSE)
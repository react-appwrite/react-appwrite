# react-appwrite-hooks

React hooks for [Appwrite](https://appwrite.io). This library is a work-in-progress, and was inspired by [react-firebase-hooks](https://www.npmjs.com/package/react-firebase-hooks). Expect bugs, missing functionality, and outdated docs.

The hooks follow this format:

```typescript
const [value, isLoading, error] = useHook(appwrite, ...)
```

All hooks take your appwrite instance as their first parameter.

### Available Hooks
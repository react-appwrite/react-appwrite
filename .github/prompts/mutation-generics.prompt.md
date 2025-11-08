---
mode: agent
model: GPT-5 (openai)
description: Generate React hooks for Appwrite services
tools: ['edit/createFile', 'edit/createDirectory', 'search/listDirectory', 'search/readFile', 'search/codebase', 'appwrite-docs/*', 'fetch']
---
Your goal is to add the proper generic type parameters for all `useMutation` calls you encounter in the folder the user specifies. You should identify files as mutations if their file name contains "create", "update", or "delete". You should work on each hook one by one rather than gathering all hooks and starting the work afterwards.

Requirements for each `useMutation` call:
* The first generic type parameter should be the return type of the `mutationFn`, but without using the `ReturnType` type
* The second generic type parameter should be the `AppwriteException` type from the "appwrite" package
* The third generic type parameter should be the `Props` for that hook, but only if a `Props` type exists for that hook. It should also pass generic type parameters if necessary
* The `mutationFn` should no longer manually list the `Props` type because the `useMutation` generic type parameter will specify it there instead
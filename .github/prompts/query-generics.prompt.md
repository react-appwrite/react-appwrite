---
mode: agent
model: GPT-5 (openai)
description: Add generic type parameters for queries
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'appwrite-docs/*', 'fetch']
---
Your goal is to add the proper generic type parameters for all `useQuery` calls you encounter in the folder the user specifies. You should identify files as queries if their file name contains "get" or "list".

Requirements for each `useQuery` call:
* The first generic type parameter should be the return type of the `queryFn`, but without using the `ReturnType` type. It should also pass generic type parameters if necessary
* The second generic type parameter should be the `AppwriteException` type from the "appwrite" package
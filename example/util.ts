import { createMiddleware, type AppwriteServerConfiguration } from 'react-appwrite-hooks/next'

export const appwriteConfiguration = {
  url: 'http://localhost/v1',
  projectId: 'test',
  key: 'f333ff6c67b1b0f4bad4b87f2fe4e0c48d9a253e93e0064c8f09997aefc080f35e0310c8d025039acbbf660cb1535a6cbb5e0ee4c3729e7b4f3556596a385f78ad9d352e48d8a88fa3c68a599f309cbc0896bc8bc1b0d848aaf441941152c650f4bcb81499fcd167d612bbaac04bdeaf41ddc9518e50aa9b3795e0b3996fd137',
} as AppwriteServerConfiguration

export const appwriteMiddleware = createMiddleware(appwriteConfiguration)
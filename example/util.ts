import { AppwriteNextServer } from 'react-appwrite/next'

export const appwrite = new AppwriteNextServer({
  url: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  key: process.env.APPWRITE_KEY as string,
})
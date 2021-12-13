import { createContext } from 'react'
import { Appwrite } from 'appwrite'

export default createContext<Appwrite>(
  new Appwrite()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
)
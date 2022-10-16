import { useContext, useEffect } from 'react'
import { useDocument } from 'react-appwrite-hooks/database'
import { AppwriteContext, useCollection } from 'react-appwrite-hooks'

type Article = {
  title: string,
  content: string,
}

export default function DatabasePage() {
  const [document, loading, documentError] = useDocument<Article>('test', 'articles', 'test')
  const [articles, , collectionError] = useCollection<Article>('test', 'articles')

  console.log({ documentError, collectionError })

  useEffect(() => {
    if (document) {
      console.log('Document changed', document)
    }
  }, [document])

  useEffect(() => {
    console.log('Collection changed', articles)
  }, [articles])

  return (
    null
  )
}
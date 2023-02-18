'use client'
import { useContext, useEffect } from 'react'
import { useDocument, useCollection } from 'react-appwrite-hooks/database'

type Article = {
  title: string,
  content: string,
}

function DatabasePage() {
  const { data: document } = useDocument<Article>('test', 'articles', 'test', {
    refetchOnWindowFocus: false,
  })

  const { data: articles } = useCollection<Article>('test', 'articles', null, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (document) {
      console.log('Document changed', document)
    }
  }, [document])

  useEffect(() => {
    console.log('Collection changed', articles)
  }, [articles])

  return (
    <div>
      <h1>
        {document?.title}
      </h1>

      <p>
        {document?.content}
      </p>
    </div>
  )
}

export default DatabasePage
'use client'

import { useEffect } from 'react'
import { useDocument, useCollection, Query } from 'react-appwrite/database'

type Article = {
  title: string,
  content: string,
  published: boolean,
}

function DatabasePage() {
  const { data: document } = useDocument<Article>('test', 'articles', 'test')
  const { data: articles } = useCollection<Article>('test', 'articles')
  const { data: publishedArticles } = useCollection<Article>('test', 'articles', [
    Query.equal<Article>('published', true)
  ])

  const { data: unpublishedArticles } = useCollection<Article>('test', 'articles', [
    Query.notEqual<Article>('published', true),
  ])

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

      <h2 className="mt-4">
        Published articles
      </h2>

      <ol>
        {
          publishedArticles?.map?.(article => (
            <li
              key={article.$id}
            >
              {article.title}
            </li>
          ))
        }
      </ol>

      <h2 className="mt-4">
        Unpublished articles
      </h2>

      <ol>
        {
          unpublishedArticles?.map?.(article => (
            <li
              key={article.$id}
            >
              {article.title}
            </li>
          ))
        }
      </ol>
    </div>
  )
}

export default DatabasePage
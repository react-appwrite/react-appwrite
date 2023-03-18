'use client'

import { useEffect } from 'react'
import { useDocument, useCollection, Query, useDocumentUpdate, DatabaseDocument } from 'react-appwrite/databases'

type Article = DatabaseDocument<{
  title: string,
  content: string,
  published: boolean,
}>

function DatabasePage() {
  const { data: article } = useDocument<Article>('test', 'articles', 'test')
  const { data: articles } = useCollection<Article>('test', 'articles')
  const { data: publishedArticles } = useCollection<Article>('test', 'articles', [
    Query.equal<Article>('published', true)
  ])

  const { data: unpublishedArticles } = useCollection<Article>('test', 'articles', [
    Query.notEqual<Article>('published', true),
  ])

  useEffect(() => {
    if (article) {
      console.log('Document changed', article)
    }
  }, [article])

  useEffect(() => {
    console.log('Collection changed', articles)
  }, [articles])

  return (
    <div>
      <h1>
        {article?.title}
      </h1>

      <p>
        {article?.content}
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
              <ArticleListItem
                {...article}
              />
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
              <ArticleListItem
                {...article}
              />
            </li>
          ))
        }
      </ol>
    </div>
  )
}

function ArticleListItem(article: Article) {
  const update = useDocumentUpdate<Article>()

  return (
    <div className="flex items-center gap-2">
      <span>
        {article.title}
      </span>

      <input
        type="checkbox"
        name={article.$id}
        checked={article.published}
        onChange={() => {
          update.mutateAsync({
            databaseId: 'test',
            collectionId: 'articles',
            documentId: article.$id,
            data: {
              published: !article.published,
            },
          })
        }}
      />
    </div>
  )
}

export default DatabasePage
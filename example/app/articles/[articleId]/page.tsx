'use client'

import { Query, useCollection, useDocument } from 'react-appwrite/databases'
import { Article, Comment as CommentType } from '../../../types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Comment } from '../../../components/Comment'
import { useMemo } from 'react'

dayjs.extend(relativeTime)

function ArticlePage({ params: { articleId } }: any) {
  const { data: articleDocument, isLoading, isError } = useDocument<Article>('test', 'articles', articleId)
  const { data: comments, isLoading: commentsLoading } = useCollection<CommentType>('test', 'comments', useMemo(() => {
    if (articleDocument?.$id) {
      return [
        Query.equal<CommentType>('articleId', articleDocument?.$id),
        Query.orderDesc<CommentType>('$createdAt'),
      ]
    }

    return []
  }, [articleDocument?.$id]), {
    enabled: !!articleDocument?.$id,
  })

  if (articleDocument && comments) {
    return (
      <article className="container py-4">
        <h1 className="text-6xl font-bold text-center">
          {articleDocument.title}
        </h1>

        <p className="mt-4 text-center">
          Created {dayjs(articleDocument.$createdAt).fromNow()}
        </p>

        <hr className="my-8 border-gray-200" />

        <p>
          {articleDocument.content}
        </p>

        <hr className="my-8 border-gray-200" />

        <h2
          className="text-5xl font-bold"
        >
          {comments?.length ?? 0} Comments
        </h2>

        <ol className="flex flex-col gap-4 mt-8">
          {
            comments?.map(comment => (
              <li
                key={comment.$id}
              >
                <Comment
                  {...comment}
                />
              </li>
            ))
          }
        </ol>
      </article>
    )
  }

  if (isLoading || commentsLoading) {
    return (
      <span>
        Loading
      </span>
    )
  }

  if (isError) {
    return (
      <span>
        Error
      </span>
    )
  }
}

export default ArticlePage
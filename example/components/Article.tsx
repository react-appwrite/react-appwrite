import Link from 'next/link'
import type { Article as ArticleType } from '../types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function Article(article: ArticleType) {
  return (
    <Link
      href={`/articles/${article.$id}`}
    >
      <div
        className="flex justify-between p-4 bg-gray-100"
      >
        <span className="text-3xl font-semibold">
          {article.title}
        </span>

        <span>
          {dayjs(article.$createdAt).fromNow()}
        </span>
      </div>
    </Link>
  )
}

export { Article }
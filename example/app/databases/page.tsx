'use client'

import { useEffect, useState } from 'react'
import { useDocument, useCollection, Query, useDocumentUpdate, DatabaseDocument, useDocumentDelete, useDocumentCreate } from 'react-appwrite/databases'
import { FiTrash } from 'react-icons/fi'

type Article = DatabaseDocument<{
  title: string,
  content: string,
  published: boolean,
}>

function DatabasePage() {
  const createDocument = useDocumentCreate<Article>();
  const { data: article } = useDocument<Article>('test', 'articles', '643866c6f386c9c982c1')
  const { data: articles } = useCollection<Article>('test', 'articles')
  const { data: publishedArticles } = useCollection<Article>('test', 'articles', [
    Query.equal<Article>('published', true)
  ])

  const { data: unpublishedArticles } = useCollection<Article>('test', 'articles', [
    Query.notEqual<Article>('published', true),
  ])

  console.log(publishedArticles)

  useEffect(() => {
    if (article) {
      console.log('Document changed', article)
    }
  }, [article])

  useEffect(() => {
    console.log('Collection changed', articles)
  }, [articles])

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-center flex-1 gap-4">
      <div className='flex flex-col md:flex-row gap-4 '>
        <form className='flex flex-col gap-4 p-4 text-black bg-white rounded-sm' onSubmit={async (e) => {
          e.preventDefault();
          await createDocument.mutateAsync({
            databaseId: 'test',
            collectionId: 'articles',
            data: {
              title: title,
              content: content,
              published: published,
            },
          });
          setTitle("");
          setContent("");
          setPublished(true)
        }}>
          <span>Create Article</span>
          <input
            type="text"
            placeholder="Title"
            className="text-white"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Content"
            className="text-white"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <label className='flex flex-row gap-2 items-center'>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => {
                setPublished(e.target.checked);
              }}
            />
            Published
          </label>
          <button
            onClick={() => {}}
            className="p-2 bg-blue-500 rounded-md w-full"
          >
            Submit
          </button>
        </form>
        <div className='flex flex-col items-center justify-start gap-4'>
          <h2 className='font-bold'>Published Articles</h2>
          {
            publishedArticles?.map((article: Article) => (
              <ArticleListItem
                key={article.$id}
                {...article}
              />
            ))
          }
        </div>
        <div className='flex flex-col items-center justify-start gap-4'>
          <h2 className='font-bold'>Unpublished Articles</h2>
          {
            unpublishedArticles?.map((article: Article) => (
              <ArticleListItem
                key={article.$id}
                {...article}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

function ArticleListItem(article: Article) {
  const update = useDocumentUpdate<Article>()
  const del = useDocumentDelete()

  return (
    <div className='flex items-center justify-center w-full gap-2'>
      <div key={article.$id} className='flex items-center justify-between w-full gap-2 py-1 px-2 text-black bg-white rounded-sm'>
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
      <FiTrash 
        className='cursor-pointer' 
        size={20} 
        onClick={() => {
          del.mutateAsync({
            databaseId: 'test',
            collectionId: 'articles',
            documentId: article.$id,
          })
        }} />
    </div>
  )
}

export default DatabasePage
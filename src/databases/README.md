# Database Hooks

➡️ [Appwrite Documentation](https://appwrite.io/docs/client/databases)

These hooks automatically subscribe to realtime updates.

## useCollection

```tsx
import { useCollection } from 'react-appwrite/databases'
import { Query } from 'appwrite'

type Article = {
  title: string,
  content: string,
  published: boolean,
}

function PublishedArticlesList() {
  const databaseId = 'myDatabase'
  const collectionId = 'articles'
  
  const { data: publishedArticles } = useCollection<Article>(databaseId, collectionId, [
    Query.equal('published', true)
  ])
  
  return (
    <ol>
      {
        publishedArticles?.documents?.map(article => (
          <li
            key={article.$id}
          >
            {article.title}
          </li>
        ))
      }
    </ol>
  )
}
```

---

## useDocument

```tsx
import { useDocument } from 'react-appwrite/databases'

type Article = {
  title: string,
  content: string,
  published: boolean,
}

function ArticleDetails() {
  const databaseId = 'myDatabase'
  const collectionId = 'articles'
  const documentId = 'my-cool-vacation'

  const { data: article } = useDocument<Article>(databaseId, collectionId, documentId)

  return (
    <div>
      <h3>{article?.name}</h3>
      <p>{article?.content}</p>
    </div>
  )
}
```
'use client'
import { useAccount, useOAuth2SignIn, useSignOut } from 'react-appwrite/account'
import { useForm } from 'react-hook-form'
import { ID } from 'appwrite'

import { useEmailSignIn, useEmailSignUp } from 'react-appwrite/account'
import { Query, useCollection } from 'react-appwrite/databases'
import { Article as ArticleType } from '../types'
import { Article } from '../components/Article'

type Props = {}

type Form = {
  email: string,
  password: string,
  create: boolean,
}

function HomePage() {
  const { data: articles } = useCollection<ArticleType>('test', 'articles', [
    Query.equal<ArticleType>('published', true),
    Query.orderDesc<ArticleType>('$createdAt'),
  ])

  return (
    <div className="container py-4">
      <h1 className="text-6xl font-bold text-center">
        Example Blog
      </h1>

      <ol className="flex flex-col gap-2 mt-16">
        {
          articles?.map(article => (
            <Article
              key={article.$id}
              {...article}
            />
          ))
        }
      </ol>
    </div>
  )
}

export default HomePage
import { render, screen, renderHook, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createServer, Model, Server } from 'miragejs'
// @ts-ignore
import { useAvatar } from 'react-appwrite/avatars'
import { jest, } from '@jest/globals'

import React from 'react'

// @ts-ignore
import { AppwriteProvider } from 'react-appwrite'
import { Client } from 'appwrite'
import { QueryClient } from '@tanstack/react-query'

const client = new Client()
  .setEndpoint(process.env.APPWRITE_URL as string)
  .setProject(process.env.APPWRITE_PROJECT_ID as string)

describe('avatars', () => {
  describe('useAvatar', () => {
    test('initials type contains name', async () => {
      // @ts-ignore
      global.fetch = jest.fn().mockImplementation(() => console.log(1))

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })

      const wrapper = ({ children }: any) => (
        <AppwriteProvider
          client={client}
          queryClient={queryClient}
          devTools={false}
        >
          {children}
        </AppwriteProvider>
      )

      const { result } = renderHook(() => useAvatar({
        type: 'initials',
        name: 'Test Suite',
      }), {
        wrapper,
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.data!.href).toMatch(/initials\?name=Test\+Suite/)
    })
  })
})
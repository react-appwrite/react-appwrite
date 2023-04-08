import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { useAvatar } from 'react-appwrite/avatars'
import { createWrapper } from './'
import type { UseQueryResult } from '@tanstack/react-query'

const parseQueryString = (result: {
  current: UseQueryResult<URL, unknown>
}) => Object.fromEntries(new URLSearchParams(result.current.data!.search))

describe('avatars', () => {
  describe('useAvatar', () => {
    describe('initials', () => {
      test('supports names', async () => {
        const { result } = renderHook(() => useAvatar({
          type: 'initials',
          name: 'Test Suite',
        }), {
          wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        const queryString = parseQueryString(result)

        expect(queryString.name).toBe('Test Suite')
      })

      test('supports dimensions', async () => {
        const { result } = renderHook(() => useAvatar({
          type: 'initials',
          name: 'Test Suite',
          dimensions: {
            width: 50,
            height: 100,
          },
        }), {
          wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        const queryString = parseQueryString(result)

        expect(queryString.width).toBe('50')
        expect(queryString.height).toBe('100')
      })

      test('supports backgrounds', async () => {
        const { result } = renderHook(() => useAvatar({
          type: 'initials',
          name: 'Test Suite',
          background: '000000',
          dimensions: {
            width: 50,
            height: 100,
          },
        }), {
          wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        const queryString = parseQueryString(result)

        expect(queryString.background).toBe('000000')
      })
    })

    describe('image', () => {
      test('supports urls', async () => {
        const { result } = renderHook(() => useAvatar({
          type: 'image',
          url: 'https://example.com'
        }), {
          wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        const queryString = parseQueryString(result)

        expect(queryString.url).toBe('https://example.com')
      })

      test('supports dimensions', async () => {
        const { result } = renderHook(() => useAvatar({
          type: 'image',
          url: 'https://example.com',
          dimensions: {
            width: 50,
            height: 100,
          }
        }), {
          wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        const queryString = parseQueryString(result)

        expect(queryString.width).toBe('50')
        expect(queryString.height).toBe('100')
      })
    })
  })
})
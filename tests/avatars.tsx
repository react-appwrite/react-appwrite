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
    test('initials contain name', async () => {
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

    test('initials contain dimensions', async () => {
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
  })
})
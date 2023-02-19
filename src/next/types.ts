import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export type AppwriteNextMiddlewareConfiguration = {
  url: string,
  project: string,
  key: string,
}

export type AppwriteNextMiddlewareHandler = (request: NextRequest) => NextResponse

export type AppwriteNextMiddleware = (handler: AppwriteNextMiddlewareHandler) => AppwriteNextMiddlewareHandler
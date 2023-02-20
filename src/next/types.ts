import { Models } from 'appwrite'
import type { NextRequest, NextResponse } from 'next/server'

export type AppwriteServerConfiguration = {
  url: string,
  projectId: string,
  key: string,
}

export type AppwriteNextHandlerResult = Response | NextResponse | Promise<NextResponse> | Promise<Response>

export type AppwriteNextMiddlewareHandler<Preferences extends Models.Preferences> = (
  request: NextRequest & {
    user?: Models.Account<Preferences>,
  }
) => Response | NextResponse | Promise<NextResponse> | Promise<Response>

export type AppwriteNextMiddleware<Preferences extends Models.Preferences> = (handler: AppwriteNextMiddlewareHandler<Preferences>) => AppwriteNextMiddlewareHandler<Preferences>
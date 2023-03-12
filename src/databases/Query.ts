import { Models, Query as AppwriteQuery, type QueryTypes } from 'appwrite'

export function equal<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.equal(attribute, value)
}

export function notEqual<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.notEqual(attribute, value)
}

export function lessThan<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.lessThan(attribute, value)
}

export function lessThanEqual<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.lessThanEqual(attribute, value)
}

export function greaterThan<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.greaterThan(attribute, value)
}

export function greaterThanEqual<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.greaterThanEqual(attribute, value)
}

export function search<Model>(attribute: Extract<keyof Model, string>, value: Extract<keyof Model, string>) {
  return AppwriteQuery.search(attribute, value)
}

export function cursorAfter(documentId: string) {
  return AppwriteQuery.cursorAfter(documentId)
}

export function cursorBefore(documentId: string) {
  return AppwriteQuery.cursorBefore(documentId)
}

export function limit(limit: number) {
  return AppwriteQuery.limit(limit)
}

export function offset(offset: number) {
  return AppwriteQuery.offset(offset)
}

export const Query = {
  equal,
  notEqual,
  lessThan,
  lessThanEqual,
  greaterThan,
  greaterThanEqual,
  search,
  cursorAfter,
  cursorBefore,
  limit,
  offset,
}
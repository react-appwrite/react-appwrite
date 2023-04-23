import { Query as AppwriteQuery, type QueryTypes } from 'appwrite'

/**
 * Returns document if attribute is equal to any value in the provided array. Applies to any indexed attribute.
 */
export function equal<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.equal(attribute, value)
}

/**
 * Returns document if attribute is not equal to any value in the provided array. Applies to any indexed attribute.
 */
export function notEqual<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.notEqual(attribute, value)
}

/**
 * Returns document if attribute is less than the provided value. Applies to any indexed attribute.
 */
export function lessThan<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.lessThan(attribute, value)
}

/**
 * Returns document if attribute is less than or equal to the provided value. Applies to any indexed attribute.
 */
export function lessThanEqual<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.lessThanEqual(attribute, value)
}

/**
 * Returns document if attribute is greater than the provided value. Applies to any indexed attribute.
 */
export function greaterThan<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.greaterThan(attribute, value)
}

/**
 * Returns document if attribute is greater than or equal to the provided value. Applies to any indexed attribute.
 */
export function greaterThanEqual<Model>(attribute: Extract<keyof Model, string>, value: QueryTypes) {
  return AppwriteQuery.greaterThanEqual(attribute, value)
}

/**
 * Searches string attributes for provided keywords. Applies to any string attribute with a full-text index.
 */
export function search<Model>(attribute: Extract<keyof Model, string>, value: Extract<keyof Model, string>) {
  return AppwriteQuery.search(attribute, value)
}

/**
 * Orders results in descending order by attribute. Attribute must be indexed. Pass in an empty string to return in natural order.
 */
export function orderDesc<Model>(attribute: Extract<keyof Model, string>) {
  return AppwriteQuery.orderDesc(attribute)
}

/**
 * Orders results in ascending order by attribute. Attribute must be indexed. Pass in an empty string to return in natural order.
 */
export function orderAsc<Model>(attribute: Extract<keyof Model, string>) {
  return AppwriteQuery.orderAsc(attribute)
}

/**
 * Places the cursor after the specified resource ID. Used for pagination.
 */
export function cursorAfter(documentId: string) {
  return AppwriteQuery.cursorAfter(documentId)
}

/**
 * Places the cursor before the specified resource ID. Used for pagination.
 */
export function cursorBefore(documentId: string) {
  return AppwriteQuery.cursorBefore(documentId)
}

/**
 * Limits the number of results returned by the query. Used for pagination.
 */
export function limit(limit: number) {
  return AppwriteQuery.limit(limit)
}

/**
 * Offset the results returned by skipping some of the results. Used for pagination.
 */
export function offset(offset: number) {
  return AppwriteQuery.offset(offset)
}

/**
 * Returns documents where attribute value is null.
 */
export function isNull<Model>(attribute: Extract<keyof Model, string>) {
  return AppwriteQuery.isNull(attribute)
}

/**
 * Returns documents where attribute value is null.
 */
export function isNotNull<Model>(attribute: Extract<keyof Model, string>) {
  return AppwriteQuery.isNotNull(attribute)
}

/**
 * Select which attributes should be returned from a document.
 */
export function select<Model>(attributes: Extract<keyof Model, string>[]) {
  return AppwriteQuery.select(attributes)
}

/**
 * Returns documents if a string attributes starts with a substring.
 */
export function startsWith<Model>(attribute: Extract<keyof Model, string>, value: string) {
  return AppwriteQuery.startsWith(attribute, value)
}

/**
 * Returns documents if a string attributes ends with a substring.
 */
export function endsWith<Model>(attribute: Extract<keyof Model, string>, value: string) {
  return AppwriteQuery.endsWith(attribute, value)
}

/**
 * Returns document if attribute value falls between the two values.
 * The boundary values are inclusive and can be strings or numbers.
 */
export function between<Model>(attribute: Extract<keyof Model, string>, start: string | number, end: string | number) {
  return AppwriteQuery.between(attribute, start, end)
}

/**
 * @link [Appwrite Documentation](https://appwrite.io/docs/databases#querying-documents)
 */
export const Query = {
  equal,
  notEqual,
  lessThan,
  lessThanEqual,
  greaterThan,
  greaterThanEqual,
  search,
  orderDesc,
  orderAsc,
  cursorAfter,
  cursorBefore,
  limit,
  offset,
  isNull,
  isNotNull,
  select,
  startsWith,
  endsWith,
  between,
}
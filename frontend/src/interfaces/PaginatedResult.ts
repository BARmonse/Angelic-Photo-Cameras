export interface PaginatedResult<T> {
  count: number
  previous: string | null
  next: string | null
  results: T
}

export type ResponseErrorType = {
  status: number
  message: string
}
export type ResponseSuccessType<T = unknown> = {
  status: number
  message: string
  data: T
}
export type ResponseSuccessListType<T = unknown> = {
  status: number
  message: string
  data: {
    results: T[]
    paginations: {
      page: number
      total_pages: number
      total_rows: number
      limit: number
      skip: number
    }
    query: string
    filter_options: {
      [key: string]: unknown
    }
    sort_options: {
      [key: string]: unknown
    }
    helper: {
      [key: string]: unknown
    }
  }
}

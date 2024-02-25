export type UrlParams = {
  params?: {
    id?: string
  }
  searchParams: {
    _page?: string
    _limit?: string
    category?: string
    q?: string
    by?: string
  }
}

export function createUrlParams({ searchParams }: UrlParams) {
  let params = '?'
  let key: keyof typeof searchParams

  for (key in searchParams) {
    params += `&${key}=${searchParams[key]}`
  }

  return params
}

export type UrlParams = {
  params: {
    productId: string
    postId: string
  }
  searchParams: {
    _page: string
    _limit: string
    category: string
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

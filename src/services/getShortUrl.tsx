export interface ShortUrls {
  code: string
  short_link: string
  full_short_link: string
  short_link2: string
  full_short_link2: string
  share_link: string
  full_share_link: string
  original_link: string
}
export const getShortUrl = (url: string): Promise<ShortUrls> => {
  return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .then((res: Response) => res.json())
    .then((data: { result: ShortUrls }) => {
      return data.result
    })
    .catch((err: Error) => {
      console.log(err)
      throw err
    })
}

export interface Keyword {
  name: string
  value: string
}

export interface ArticleDoc {
  _id: string
  headline: { main: string }
  byline?: { original: string }
  snippet: string
  pub_date: string
  web_url: string
  keywords: Keyword[]
}

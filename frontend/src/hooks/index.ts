
export interface Blog {
  title: string,
  content: string,
  id: string,
  publishedDate:string,
  author: {
    name: string,
    email:string
  }
}

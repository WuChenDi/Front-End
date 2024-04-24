export interface getAllBlogs_getAllBlogs_blogsings {
  id: string
  title: string
  content: string
  __typename: 'Blog'
}

export interface getAllBlogs {
  blogs: getAllBlogs_getAllBlogs_blogsings[]
}

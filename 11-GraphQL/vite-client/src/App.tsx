import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'
import { getAllBlogs } from './__generated__/getAllBlogs'

export default defineComponent({
  name: 'App',
  setup() {
    const GET_ALL_BLOGS = gql`
      query AllBlogs {
        blogs {
          id
          title
          content
        }
      }
    `
    const { result, loading } = useQuery<getAllBlogs>(GET_ALL_BLOGS)

    return () => (
      <>
        {loading.value ? (
          <div>loading...</div>
        ) : (
          <ul>
            {result.value?.blogs.map(blog => (
              <li key={blog.id}>
                {blog.title} - {blog.content}
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }
})

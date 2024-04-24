import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const serverPort = import.meta.env.VITE_SERVER_PORT || '5174'

const httpLink = createHttpLink({
  uri: `http://localhost:${serverPort}/graphql`
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export default apolloClient
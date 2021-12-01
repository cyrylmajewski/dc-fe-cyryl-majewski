import { createApp, h } from 'vue'
import { store, key } from '@/store/index'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import App from './App.vue'
import 'vue-multiselect/dist/vue-multiselect.css';

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://rickandmortyapi.com/graphql',
})
// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp({
  render: () => h(App)
})

app.use(store, key);
app.use(apolloProvider)
app.mount('#app')



<template>
  <div class="wrapper">
    <Header @search-by-name="searchByName" />
    <Tabs />
    <List :toggle="toggleToFavorites" :characters="characters" :favorites="favorites" />
  </div>
  <div class="footer">
    <Pagination :page="page" :pages="characters.info.pages" @change-page="changePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Tabs from './components/Tabs.vue';
import List from './components/List.vue';
import Pagination from './components/Pagination.vue';
import gql from 'graphql-tag';

export default defineComponent({
  name: 'App',
  data() {
    return {
      page: 1 as number,
      name: '' as string,
      favorites: [] as Array<number>,
      characters: {
        info: {
          pages: 0
        }
      }
    }
  },  
  components: {
    Header,
    Tabs,
    List,
    Pagination
  },
  methods: {
    changePage(page: number) {
      this.page = page;
      this.$apollo.queries.characters.fetchMore({
        variables: {
          page: this.page,
          name: this.name
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newResult = fetchMoreResult;

          return {
            characters: {
              info: newResult.characters.info,
              results: newResult.characters.results,
              __typename: previousResult.characters.__typename,
            }
          }
        }
      })
    },
    toggleToFavorites(id: number) {
      const result = this.favorites.find(item => item === id);
      !result ? this.favorites.push(id) : this.favorites = this.favorites.filter(item => item !== id);
    },
    searchByName(value: string) {
      this.name = value;
      this.$apollo.queries.characters.fetchMore({
        variables: {
          page: this.page,
          name: this.name
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newResult = fetchMoreResult;

          return {
            characters: {
              info: newResult.characters.info,
              results: newResult.characters.results,
              __typename: previousResult.characters.__typename,
            }
          }
        }
      })
    }
  },
  apollo: {
    characters() {
      return {
        query: gql` 
          query characters($page: Int!, $name: String!) {
            characters(page: $page, filter: { name: $name }) {
              info {
                pages
              }
              results {
                id
                name
                status
                species
                gender
                image
                episode {
                  episode
                }
              }
            }
          }
        `,
        variables: {
          page: 1,
          name: '',
        }
      }
    }
  }
});
</script>

<style lang="scss">
@import url('./assets/styles/normalize.css');

</style>

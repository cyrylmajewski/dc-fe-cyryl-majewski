<template>
  <div class="wrapper">
    <Header @search="searchBy" />
    <Tabs :active="active" @change-tab="changeTab" />
    <List v-if="active === 'all'" :toggle="toggleToFavorites" :characters="characters.results" :favorites="favorites" />
    <List v-if="active === 'favs'" :toggle="toggleToFavorites" :characters="charactersByIds" :favorites="favorites" />
  </div>
  <div class="footer" v-if="active === 'all' && (search === '' || search === 'name')">
    <Pagination :page="page" :pages="characters.info.pages" @change-page="changePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Tabs from './components/Tabs.vue';
import List from './components/List.vue';
import Pagination from './components/Pagination.vue';
import { СHARACTERS_BY_ID, CHARACTERS } from './graphql/queries';

export default defineComponent({
  name: 'App',
  data() {
    return {
      page: 1 as number,
      name: '' as string,
      search: '' as string,
      favorites: [] as Array<number>,
      characters: {
        info: {
          pages: 0
        },
        results: []
      },
      active: 'all' as string,
      charactersByIds: [],
      skipQuery: true as boolean,
      episodes: []
    }
  },  
  components: {
    Header,
    Tabs,
    List,
    Pagination
  },
  computed: {
    idString(): string {
      const result: string = this.favorites.join(',');
      return result;
    }
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
    changeTab(tab: string) {
      this.active = tab;
    },
    toggleToFavorites(id: number) {
      const result = this.favorites.find(item => item === id);
      !result ? this.favorites.push(id) : this.favorites = this.favorites.filter(item => item !== id);
      this.loadFavorites(this.idString);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    searchBy({ type, value }) {
      this.search = value;

      const searchObj = {
        page: this.page,
        name: type === 'name' ? value : '',
        gender: type === 'gender' ? value : '',
        species: type === 'species' ? value : ''
      }

      this.$apollo.queries.characters.fetchMore({
        variables: searchObj,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newResult = fetchMoreResult;
          console.log(newResult);
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
    async loadFavorites(idString: string) {
      if(!idString) {
        this.charactersByIds = [];
        return;
      }

      this.$apollo.query({
        query: СHARACTERS_BY_ID,
        variables: {
          ids: idString
        }
      })
      .then(response => {
        this.charactersByIds = response.data.charactersByIds;
      });
    }
  },
  apollo: {
    characters() {
      return {
        query: CHARACTERS,
        variables: {
          page: 1,
          name: '',
          gender: '',
          species: ''
        }
      }
    },
  },
  mounted() {
    const favorites: string | null = localStorage.getItem("favorites");
    this.favorites = favorites !== null ? JSON.parse(favorites) : [];

    if(this.favorites) {
      this.loadFavorites(this.idString);
    }
  }
});
</script>

<style lang="scss">
@import url('./assets/styles/normalize.css');

</style>

import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

type Info = {
  "count": number,
  "pages": number,
  "next": string,
  "prev": string
}

export interface State {
  info: Info,
  page: number,
  perPage: number,
  characters: Array<any>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: ''
    },
    page: 1,
    perPage: 1,
    characters: []
  },
  getters: {
    getCharacters: state => {
      return state.characters
    }
  },
  mutations: {
    saveCharacters(state, payload) {
      state.characters = payload.characters;
    },
    setPage(state, payload) {
      state.page = payload.page;
    },
    saveInfo(state, payload) {
      state.info = payload.info;
    }
  },
  actions: {
    async loadCharacters({ commit }, page) {
      await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(res => res.json())
      .then(async array => {
        commit('saveInfo', { info: array.info });
        const res = await array.results.map(async (item: any) => {
          const LAST_EPISODE_INDEX = item.episode.length - 1;
          await fetch(item.episode[LAST_EPISODE_INDEX])
          .then(res => res.json())
          .then(res => item.lastEpisode = res.episode);
          
          this.state.characters.push(item)
          return item;
        });
        commit('setPage', { page })
        return res;
      })
      .then(res => {
        Promise.all(res).then(characters => {
          commit('saveCharacters', { characters });
        })
      })
    }
  }
})

// define your own `useStore` composition function
export function useStore(): Store<State> {
  return baseUseStore(key)
}
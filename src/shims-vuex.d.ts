import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  export interface State {
    info: Info,
    page: number,
    perPage: number,
    characters: Array<any>
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
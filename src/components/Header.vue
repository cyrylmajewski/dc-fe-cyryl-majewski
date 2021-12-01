<template>
  <div class="header">
    <div class="container">
      <div class="header__container">
        <div class="header__logo">
          <img src="../assets/images/logo.png" alt="logo">
        </div>
        <Search @search-by-name="searchByName" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from './Search.vue';

export default defineComponent({
  name: 'Header',
  components: {
    Search
  },
  methods: {
    searchByName(value: string) {
      this.$emit('searchByName', value);
    }
  }
})

</script>

<style scoped lang="scss">

.header {
  padding: 32px 0;

  &__container {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1640px;
    margin: 0 auto;
  }

  &__logo {
    width: 100%;
    max-width: 240px;
    margin-right: 80px;
  }
}
</style>
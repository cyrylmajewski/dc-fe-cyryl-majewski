<template>
  <div class="header">
    <div class="container">
      <div class="header__container">
        <div class="header__logo">
          <img src="../assets/images/logo.png" alt="logo">
        </div>
        <Search @search="search" />
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
    search(value: string) {
      this.$emit('search', value);
    }
  }
})

</script>

<style scoped lang="scss">

.header {
  padding: 32px 0;

  &__container {
    @include flex(center, center, $wrap: wrap, $dir: column);
    width: 100%;
    max-width: 1640px;
    margin: 0 auto;

    @media #{$lg} {
      flex-direction: row;
      justify-content: space-between;
    }
    @media #{$xl} {
      justify-content: flex-start;
    }
  }

  &__logo {
    width: 100%;
    max-width: 170px;
    margin-bottom: 40px;

    @media #{$lg} {
      max-width: 240px;
      margin-right: 80px;
      margin-bottom: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
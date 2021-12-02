<template>
  <div class="tabs">
    <div class="container">
      <ul class="tabs__list">
        <li class="tabs__list-item">
          <a href="#" 
            @click="changeTab('all')" 
            class="tabs__list-link" 
            :class="{ 'active' : active === 'all' }"
            >All characters</a>
        </li>
        <li class="tabs__list-item">
          <a href="#" 
            @click="changeTab('favs')" 
            class="tabs__list-link"
            :class="{ 'active' : active === 'favs' }"
            >Favorites</a>
          </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Tabs',
  props: ['active'],
  methods: {
    changeTab(tab: string) {
      this.$emit('changeTab', tab);
    }
  }
})
</script>

<style lang="scss" scoped>
$color-main: #11B0C8;
$color-secondary: #E5EAF4;
.tabs {
  padding-top: 24px;
  border-top: 1px solid $color-secondary;
  margin-bottom: 27px;

  &__list {
    @include flex();

    &-item {
      font-weight: 500;
      font-size: 16px;
      margin-right: 80px;

      &:last-child {
        margin-right: 0;
      }
    }

    &-link {
      @include transition();
      position: relative;
      display: block;
      line-height: 24px;

      &::after {
        @include transition();
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 3px;
        background: $color-main;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
      }

      &:hover {
        color: $color-main;
      }

      &.active {
        color: $color-main;
        
        &::after {
          width: 100%;
        }
      }
    }
  }
}
</style>
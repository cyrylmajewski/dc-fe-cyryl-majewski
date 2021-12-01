<template>
  <button @click="toggle(id)" class="button" :class="{'active': checked}">
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z" fill="#11B0C8"/>
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: ['id', 'toggle', 'checked'],
})
</script>

<style lang="scss" scoped>
.button {
  width: 43px;
  height: 43px;
  background: transparent;
  border: 2px solid #11B0C8;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 9px;
  cursor: pointer;

  img, svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &.active {
    background: #11B0C8;

    svg path {
      fill: #fff;
    }
  }
}
</style>
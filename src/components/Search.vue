<template>
  <div class="search">
    <label for="search" class="search__label">Search by</label>
    <multiselect
      v-model="selected"
      label="name"
      track-by="name"
      :placeholder="selected.name"
      :options="options"
      :taggable="false"
      :showPointer="false"
      :hideSelected="true"
      :showLabels="false"
      :searchable="false"
      :close-on-select="true">
    </multiselect>
    <div class="search__box">
      <input v-model="inputValue" id="search" type="text" class="search__input">
      <button @click="search" class="search__button">
        <img src="../assets/images/search.svg" alt="search">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Multiselect from 'vue-multiselect';

export default defineComponent({
  name: 'Search',
  components: { Multiselect },
  data() {
    return {
      inputValue: '',
      selected: { name: 'Name', type: 'name' },
      options: [
        { name: 'Name', type: 'name' },
        { name: 'Species', type: 'species' },
        { name: 'Gender', type: 'gender' }
      ],
    }
  },
  methods: {
    search() {
      this.$emit('search',{type: this.selected.type, value: this.inputValue});
    }
  }
})
</script>

<style lang="scss">
$color-main: #A9B1BD;

.search {
  @include flex(flex-start, center, $dir: column-reverse);
  width: 100%;
  max-width: 350px;
  position: relative;

  @media #{$xs} {
    width: auto;
    max-width: none;
    height: 56px;
    border: 1px solid $color-main;
    border-radius: 12px;
    flex-direction: row;
  }

  &__box {
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    @media #{$xs} {
      width: auto;
      margin-bottom: 0;
    }
    @media #{$lg} {
      width: 252px;
    }
  }

  &__label {
    display: none;
    padding: 0 20px;

    @media #{$xs} {
      display: block;
    }
  }

  &__button {
    @include flex(center, center);
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &__select {
    height: 100%;
    border: none;
    border-right: 1px solid $color-main;
    border-left: 1px solid $color-main;
    padding: 0 16px;
    color: $color-main;
  }

  &__input {
    width: 100%;
    height: 100%;
    min-height: 50px;
    border: none;
    padding-left: 10px;
    border: 1px solid $color-main;
    border-radius: 12px;

    @media #{$xs} {
      border: none;
      min-height: 40px;
    }

    &:focus {
      outline: transparent;
    }
  }
}

.multiselect {
  height: 100%;
  width: 100%;
  min-height: 50px !important;
  border: 1px solid $color-main;
  border-radius: 12px;
  
  @media #{$xs} {
    width: 130px !important;
    min-height: 40px !important;
    border: none;
    border-left: 1px solid $color-main;
    border-right: 1px solid $color-main;
    border-radius: 0;
  }

  &__tags {
    display: flex !important;
    align-items: center !important;
    height: 100%;
    min-height: 50px !important;
    border: none !important;
    padding: 0 !important;
    font-size: 16px !important;
    cursor: pointer;
    border-radius: 12px !important;

    @media #{$xs} {
      min-height: 40px !important;
    }
  }

  &__select {
    padding: 0 !important;
    top: 50% !important;
    z-index: 9;
    transform: translateY(-50%);
  }

  &__single {
    color: $color-main;
    font-size: 16px !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    padding-left: 16px !important; 
  }

  &__option {
    padding: 0 !important;
    min-height: 1px !important;
    padding-left: 16px;

    &--selected {
      font-weight: 400 !important;
      background: transparent !important;
    }
  }

  &__element {
    display: flex !important;
    align-items: center !important;
    height: 56px;
    border-top: 1px solid $color-main;
    padding-left: 16px;
    cursor: pointer;

    &:first-child {
      border: none !important; 
    }
  }

  &__content-wrapper {
    border: 1px solid #A9B1BD !important;
    border-radius: 0px 0px 12px 12px !important;
  }

  &--active {
    .multiselect__select {
      transform: translateY(-50%) !important;
    }
  }
}
</style>
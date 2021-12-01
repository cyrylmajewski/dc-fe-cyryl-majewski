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
      :showLabels="false"
      :searchable="false"
      :close-on-select="true">
    </multiselect>
    <input v-model="inputValue" id="search" type="text" class="search__input">
    <button @click="search" class="search__button">
      <img src="../assets/images/search.svg" alt="search">
    </button>
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
        { name: 'Identifier', type: 'indetify' },
        { name: 'Episode', type: 'episode' }
      ],
    }
  },
  methods: {
    search() {
      console.log(this.selected);

      if(this.selected.type === 'name') {
        this.$emit('searchByName', this.inputValue);
      }
    }
  }
})
</script>

<style lang="scss">
$color-main: #A9B1BD;
.search {
  display: flex;
  align-items: center;
  position: relative;
  height: 56px;
  border: 1px solid $color-main;
  border-radius: 12px;

  &__label {
    padding: 0 20px;
  }

  &__button {
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
    height: 100%;
    border: none;
    padding-left: 10px;
    border-radius: 12px;

    &:focus {
      outline: transparent;
    }
  }
}

.multiselect {
  height: 100%;
  width: 130px !important;
  border-right: 1px solid $color-main;
  border-left: 1px solid $color-main;

  &__tags {
    display: flex !important;
    align-items: center !important;
    height: 100%;
    border: none !important;
    padding: 0 !important;
    font-size: 16px !important;
    cursor: pointer;
  }

  &__select {
    padding: 0 !important;
    top: 7px !important;
    z-index: 9;
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
}
</style>
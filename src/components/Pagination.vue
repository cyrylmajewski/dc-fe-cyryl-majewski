<template>
  <div class="pagination-component">
    <div class="container">
      <v-pagination
        v-model="currentPage"
        :pages="pages"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="changePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VPagination from "@hennge/vue3-pagination";

export default defineComponent({
  name: 'Pagination',
  props: ['page', 'pages'],
  components: { VPagination },
  methods: {
    changePage(page: number) {
      this.$emit('changePage', page);
    },
  },
  computed: {
    currentPage() {
      return this.page;
    }
  },
})
</script>

<style lang="scss">
%pagination-button {
  width: 34px;
  height: 34px;
  background-color: transparent !important;
  border: 1px solid #A9B1BD;
  box-sizing: border-box;
  border-radius: 4px;

  @media #{$md} {
    width: 40px;
    height: 40px;
  }
}

.pagination-component {
  padding: 40px 0 61px;
}

.Pagination {
  @include flex(center, center, wrap, row);
  margin: 0;
  padding: 0;
  list-style-type: none; 

  @media #{$md} {
    justify-content: flex-start;
  }
}

.PaginationControl {
  @extend %pagination-button;
  display: none;

  @media #{$md} {
    @include flex(center, center);
    margin: 0 4px;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
}

.Control {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  margin: 0 2px;
  fill: #BBBBBB; 
}
.Control-active {
  fill: #11B0C8;
  cursor: pointer;
  transition: fill 0.2s ease-in-out; 
}

.Control-active:hover {
  fill: #11B0C8;
  transition: fill 0.2s ease-in-out; 
}

.Page {
  @extend %pagination-button;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  color: #A9B1BD;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  user-select: none; 
}
.Page:hover {
  border: 1px solid #DEDEDE; 
}
.Page-active {
  color: #fff;
  border: 1px solid #11B0C8; 
  background-color: #11B0C8 !important;
}

.DotsHolder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 0 2px;
  box-sizing: border-box; 
}

.Dots {
  width: 8px;
  height: 4px;
  fill: #BBBBBB; 
}
</style>
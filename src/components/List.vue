<template>
  <div class="list">
    <div class="list__test">
      <div class="list__test-header">
        <div class="list__test-row">
          <div class="container">
            <div class="list__test-col">Photo</div>
            <div class="list__test-col">
              <span>Character</span> ID
            </div>
            <div class="list__test-col">Name</div>
            <div class="list__test-col">Gender</div>
            <div class="list__test-col">Species</div>
            <div class="list__test-col">Last Episode</div>
            <div class="list__test-col">Add To Favorites</div>
          </div>
        </div>
      </div>
      <div class="list__test-body" v-if="characters">
        <div v-for="character in characters" :key="character.id" class="list__test-row" :class="{ 'dead' : character.status === 'Dead' }">
          <div class="container">
            <div class="list__test-col">
              <div class="list__test-image">
                <img :src="character.image" :alt="character.name">
              </div>
            </div>
            <div class="list__test-col">{{ character.id }}</div>
            <div class="list__test-col">{{ character.name }}</div>
            <div class="list__test-col">{{ character.gender }}</div>
            <div class="list__test-col">{{ character.species }}</div>
            <div class="list__test-col">{{ character.episode[character.episode.length - 1].episode }}</div>
            <div class="list__test-col">
              <Button :toggle="toggle" :id="character.id" :checked="favorites.find(item => item === character.id) !== undefined ? true : false" />

              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from './Button.vue';

export default defineComponent({
  name: 'List',
  components: { Button },
  props: ['characters', 'toggle', 'favorites'],
  data() {
    return {
      loading: false,
      page: 1
    }
  },
});
</script>

<style lang="scss" scoped>

.list__test {
  overflow: scroll;
  height: 65vh;

  &-image {
    @include flex(center, center);
    position: relative;
    height: 68px;
    mix-blend-mode: luminosity;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &::after {
      content: '';
      display: none;
      position: absolute;
      width: 16px;
      height: 28px;
      background: url('../assets/images/dead.svg') center center / contain no-repeat;
      top: -3px;
      right: -5px;
    }
  }

  &-header {
    position: sticky;
    top: -2px;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #A9B1BD;
    text-align: left;
    padding: 16px 0;
    background: #fff;
    z-index: 9;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(229, 234, 244, 0.25);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .list__test-row {
      border: none;
    }
  }

  &-body {
    .list__test-row {
      font-size: 16px;
      line-height: 22px;
      color: #A9B1BD;
      padding: 8px 0;
    }
  }

  &-row {
    position: relative;
    border-bottom: 1px solid #E5EAF4;
    .container {
      @include flex();
    }

    &.dead {
        .list__test-image {
          img {
            filter: grayscale(100%); 
          }
          
          &::after {
            display: block;
          }
        }
    }
  }

  &-col {
    @include flex($align: center);
    &:first-child {
      flex-basis: 12.5%;

      @media #{$xl} {
        flex-basis: 10%;
      }
    }

    &:nth-child(2) {
      flex-basis: 8%;

      @media #{$xl} {
        flex-basis: 13.5%;
      }

      span {
        display: none;

        @media #{$xl} {
          display: inline;
        }
      }
    }

    &:nth-child(3) {
      flex-basis: 17.5%;

      @media #{$xl} {
        flex-basis: 13.3%;
      }
    }

    &:nth-child(4), &:nth-child(5) {
      flex-basis: 14.4%;

      @media #{$xl} {
        flex-basis: 12.9%;
      }
    }

    &:nth-child(6) {
      flex-basis: 13.2%;

      @media #{$xl} {
        flex-basis: 13.2%;
      }
    }

    &:last-child {
      flex-basis: 20%;

      @media #{$xl} {
        flex-basis: 24.2%;
      }
    }
  }
}
</style>
<template>
  <div class="list">
    <div class="list__table">
      <div class="list__table-header">
        <div class="list__table-row">
          <div class="container">
            <div class="list__table-col">Photo</div>
            <div class="list__table-col">
              <span>Character &nbsp;</span> ID
            </div>
            <div class="list__table-col">Name</div>
            <div class="list__table-col">Gender</div>
            <div class="list__table-col">Species</div>
            <div class="list__table-col">Last Episode</div>
            <div class="list__table-col">Add To Favorites</div>
          </div>
        </div>
      </div>
      <div class="list__table-body" v-if="characters">
        <div v-for="character in characters" :key="character.id" class="list__table-row" :class="{ 'dead' : character.status === 'Dead' }">
          <div class="container">
            <div class="list__table-col">
              <div class="list__table-image">
                <img :src="character.image" :alt="character.name">
              </div>
            </div>
            <div class="list__table-col">{{ character.id }}</div>
            <div class="list__table-col">
              <a href="#" @click="openPopup(character, $event)" class="list__table-link">{{ character.name }}</a>
              <span class="list__table-name">{{ character.name }}</span>
            </div>
            <div class="list__table-col">{{ character.gender }}</div>
            <div class="list__table-col">{{ character.species }}</div>
            <div class="list__table-col">{{ character.episode[character.episode.length - 1].episode }}</div>
            <div class="list__table-col">
              <Button :toggle="toggle" :id="character.id" :checked="favorites.find(item => item === character.id) !== undefined ? true : false" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="popupActive" class="popup">
      <div class="popup__container">
        <div class="popup__id">
          Character ID:
          {{ currentCharacter.id }}
        </div>
        <div class="popup__image" :class="{ 'dead' : currentCharacter.status === 'Dead' }">
          <img :src="currentCharacter.image" :alt="currentCharacter.name">
        </div>
        <div class="popup__name">
          {{ currentCharacter.name }}
        </div>
        <div class="popup__gender">
          Gender: {{ currentCharacter.gender }}
        </div>
        <div class="popup__species">
          Species: {{ currentCharacter.species }}
        </div>
        <div class="popup__episode">
          Last episode: {{ currentCharacter.episode }}
        </div>
        <div class="popup__fav">
          <Button :toggle="toggle" :id="currentCharacter.id" :checked="favorites.find(item => item === currentCharacter.id) !== undefined ? true : false" />
        </div>
        <button @click="popupActive = !popupActive" class="popup__close">
          <img src="../assets/images/close.svg" alt="close">
        </button>
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
      page: 1,
      popupActive: false,
      currentCharacter: {
        id: 0 as number,
        name: '' as string,
        image: '' as string,
        gender: '' as string,
        species: '' as string,
        episode: '' as string,
        status: '' as string
      }
    }
  },
  methods: {
    openPopup({ id, name, image, gender, species, episode, status }, event: MouseEvent) {
      event.preventDefault();
      this.currentCharacter.id = id;
      this.currentCharacter.name = name;
      this.currentCharacter.image = image;
      this.currentCharacter.gender = gender;
      this.currentCharacter.species = species;
      this.currentCharacter.episode = episode[episode.length - 1].episode;
      this.currentCharacter.status = status;
      
      this.popupActive = !this.popupActive;
    }
  }
});
</script>

<style lang="scss" scoped>
$color-main: #11B0C8;

.popup {
  @include flex(center, center);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;

  &__container {
    @include flex(flex-start, center, nowrap, column);
    position: relative;
    padding: 25px 15px;
    background: #fff;
  }

  &__id {
    margin-bottom: 15px;
    font-weight: 700;
  }

  &__image {
    position: relative;
    width: 100%;
    max-width: 250px;
    margin-bottom: 10px;

    &::after {
      content: '';
      display: none;
      position: absolute;
      width: 24px;
      height: 42px;
      background: url('../assets/images/dead.svg') center center / contain no-repeat;
      top: -3px;
      right: -5px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &.dead {
      img {
        filter: grayscale(100%); 
      }
      
      &::after {
        display: block;
      }
    }
  }

  &__name {
    font-weight: 700;
    color: #000;
    margin-bottom: 7px;
  }

  &__gender {
    margin-bottom: 7px;
  }

  &__species {
    margin-bottom: 7px;
  }

  &__episode {
    margin-bottom: 15px;
  }

  &__close {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.list {
  &__table {
    overflow: scroll;
    height: 46vh;

    @media #{$sm} {
      height: 57vh;
    }
    @media #{$md} {
      height: 65vh;
    }

    &-image {
      @include flex(center, center);
      position: relative;
      width: 68px;
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

    &-name {
      display: none;
      @media #{$md} {
        display: inline;
      }
    }
    &-link {
      @include transition();
      position: relative;
      display: block;
      color: $color-main;
      font-weight: 600;
      font-size: 14px;
      text-align: left;

      @media #{$xs} {
        text-align: center;
      }
      @media #{$md} {
        display: none;
      }

      &:hover {
        color: #0c8da1;
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
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(229, 234, 244, 0.25);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .list__table-row {
        border: none;
      }
    }

    &-body {
      .list__table-row {
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
          .list__table-image {
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
        flex-basis: 35%;

        @media #{$xs} {
          flex-basis: 20%;
        }
        @media #{$sm} {
          flex-basis: 21%;
        }
        @media #{$md} {
          flex-basis: 12.5%;
        }
        @media #{$xl} {
          flex-basis: 10%;
        }
      }

      &:nth-child(2) {
        display: none;

        @media #{$md} {
          display: flex;
          flex-basis: 8%;
        }
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
        flex-basis: 65%;

        @media #{$xs} {
          flex-basis: 50%;
          justify-content: center;
        }
        @media #{$sm} {
          flex-basis: 29%;
        }
        @media #{$md} {
          flex-basis: 17.5%;
          justify-content: flex-start;
        }
        @media #{$xl} {
          flex-basis: 13.3%;
        }
      }

      &:nth-child(4) {
        display: none;

        @media #{$sm} {
          display: flex;
          flex-basis: 25%;
          justify-content: center;
        }
        @media #{$md} {
          justify-content: flex-start;
          flex-basis: 14.4%;
        }
        @media #{$xl} {
          flex-basis: 12.9%;
        }
      }

      &:nth-child(5) {
        display: none;
        
        @media #{$md} {
          display: flex;
          flex-basis: 14.4%;
        }
        @media #{$xl} {
          flex-basis: 12.9%;
        }
      }

      &:nth-child(6) {
        display: none;

        @media #{$md} {
          display: flex;
          flex-basis: 13.2%;
        }
      }

      &:last-child {
        display: none;
        
        @media #{$xs} {
          display: flex;
          flex-basis: 30%;
          justify-content: center;
        }
        @media #{$sm} {
          flex-basis: 25%;
        }
        @media #{$md} {
          justify-content: flex-start;
        }
        @media #{$xl} {
          flex-basis: 24.2%;
        }
      }
    }
  }
}
</style>
<template>
  <div class="vi-main-app-preloader" v-bind:class="containerClass">
    <div class="vi-main-app-preloader-content">
      <moon-loader :class="cls" :size="40" :color="spinnerColor"></moon-loader>
      <div class="vi-main-app-preloader-msg" v-if="message">{{message}}</div>
      <div class="vi-preloader-progress" v-show="showProgress">
        <div class="vi-progress-bar-frame">
          <div class="vi-progress-line" :style="lineWidth"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MoonLoader} from "@saeris/vue-spinners";
  import {mapState} from "vuex";

  export default {
    name: "Preloader",
    props: ['message', 'cls', 'containerClass', 'showProgress'],
    components: {
      MoonLoader
    },
    computed: {
      ...mapState(["astrings"]),
      lineWidth: (component) => {
        return `width: ${component.percents}%`;
      },

      spinnerColor: (component) => {
        return component.containerClass === "vi-preloader-posts-list" ? "white" : "#3c9cff";
      }
    }
  }
</script>

<style lang="sass">
  @import "../assets/styles/variables"

  .vi-main-app-preloader
    position: absolute
    background: #272727
    display: flex
    align-items: center
    justify-content: center
    z-index: 100
    top: 0
    bottom: 0
    left: 0
    right: 0

    &.vi-preloader-transparent
      background: rgba(255, 255, 255, 0.8)

    &.vi-preloader-posts-list
      background: rgba(60, 156, 255, 0.7)


  .vi-main-app-preloader-content
    +setGridAuto(auto, 20px, "rows")
    justify-items: center
    color: $app_main_color

  .vi-main-app-preloader-msg
    font-size: 14px

  .vi-progress-bar-frame
    display: flex
    width: 100%
    border: solid 1px $app_main_color

  .vi-preloader-progress
    +setGridAuto(auto, 10px, "rows")
    width: 100%

    h5
      display: flex
      justify-content: center

  .vi-progress-line
    display: flex
    justify-content: flex-start
    height: 3px
    background: $app_main_color
</style>

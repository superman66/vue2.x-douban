<template>
  <transition>
    <svg class="scroll-spinner" :class="{ show: show }" v-show="show" width="68px" height="68px" viewBox="0 0 44 44">
      <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
  </transition>
</template>

<script>
  export default {
    props: ['show']
  }
</script>

<style lang="scss">
  $offset: 126;
  $duration: 1.4s;
  .scroll-spinner {
    position: absolute;
    z-index: 999;
    transition: opacity .15s ease;
    animation: rotator $duration linear infinite;
    animation-play-state: paused;
    right: 50%;
    bottom:0;
    margin-right: -34px;
    &.show {
      animation-play-state: running
    }

    &.v-enter, &.v-leave-active {
      opacity: 0;
    }

    &.v-enter-active, &.v-leave {
      opacity: 1;
    }
  }


</style>
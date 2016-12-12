<template>
  <div>
    <div class="index">
      <h1>Vuex Demo</h1>
      <section>
        count: {{count}}
        <button >+</button>
        <button >-</button>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .index {
    color: #333;
    font-size: 16px;
    width: 1000px;
    margin: auto;
    text-align: center;
  }
</style>
<script>
  // 需要import才能使用 mapState
  export default{
    data(){
      return {
        count: 0
      }
    },

  };
</script>

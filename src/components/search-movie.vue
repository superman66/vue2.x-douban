<template>
  <div class="search">
    <input type="text" class="search-input" v-model.trim="query" @keyup.enter="search()" name="search"
           placeholder="电影、导演、演员..."/>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        query: '',
      }
    },
    methods: {
      search(){
        this.$router.push({path: 'search', query: {query: this.query}});
      }
    }
  };
</script>
<style scoped lang="scss">
  .search {
    padding: 60px 15px 13px;
    background: #fff;
    .search-input {
      -webkit-appearance: none;
      border: 0;
      border-radius: 5px;
      outline: 0;
      background: #f5f5f5;
      padding: 10px 5px;
      width: 100%;
    }
  }
</style>

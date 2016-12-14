<template>
  <div class="container">
    <h2>Github用户查找API</h2>
    <div class="search-container">
      <input name="search" class="search-input" v-model.trim="username" @keyup.enter="search()" placeholder="请输入用户名查找" >
    </div>
    <ul v-if="user.login">
      <li v-for="u in user" v-if="u">
        {{u}}
      </li>
    </ul>
    <div class="not-found" v-if="!user.login&&username">
      {{username}} Not Found!
    </div>
    <loading v-if="loading"></loading>
  </div>

</template>
<style scoped lang="scss">
  .container{
    margin: 0 auto;
    width: 100%;
  }
  h2{
    text-align: center;
  }
  .search-container{
    margin: 0 auto;
    text-align: center;
    margin-bottom: 10px;
  }
  .search-input{
    -webkit-appearance: none;
    border: 0;
    background: #f7f7f7;
    padding: 10px;
    width: 200px;
    outline: none;
  }
  ul{
    list-style: none;
    margin: auto;
    padding: 0 70px;
    width: 900px;
    li{
      border-radius: 5px;
      color: #333;
      background: #f7f7f7;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 5px;
    }
  }
  .not-found{
    margin: 0 auto;
    text-align: center;
  }
</style>
<script>
  import {mapState} from 'vuex';
  import loading from '../components/Spinner.vue'
  export default{
    data(){
      return {
        username:'',
        loading: false,
      }
    },
    mounted(){

    },
    methods:{
      search(){
//        this.loading = true;
        console.log(this.username);
        this.$store.dispatch('user', this.username);
      }
    },
    components:{
      loading
    }
  };
</script>

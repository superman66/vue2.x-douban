<template>
    <div>
        <div>{{query}}</div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
              query: ''
            }
        },
      mounted(){
          this.query = this.$route.query.query;
        console.log(this.query);
      },
      watch: {
        '$route': 'fetchData'
      },
      methods:{
        fetchData(){
          this.query = this.$route.query.query;
        }
      }
    };
</script>
<style scoped lang="scss">
    
</style>

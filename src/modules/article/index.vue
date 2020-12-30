<template>
  <div class="posts">
    <div class="posts__list"></div>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  components: {
    
  },
  props: ['workspace'],
  data () {
    return {
      
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$api['article/list']({
        workspace: this.workspace
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
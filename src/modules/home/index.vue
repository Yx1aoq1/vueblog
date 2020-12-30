<template>
  <div class="home-layout">
    <div class="home-layout__aside">
      21123123
    </div>
    <div class="home-layout__content"></div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  components: {
    
  },
  props: {
  },
  data () {
    return {
      
    }
  },
  created () {
    
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
@background-color: #a39990;

.home-layout {
  display: flex;
  height: 100vh;
  flex-direction: row;
  overflow: hidden;
  background: @background-color;
  font-family: PixelMillennium;
  &__aside {
    width: 30%;
  }

  &__content {
    height: 100%;
    flex: 1;
  }
}
</style>

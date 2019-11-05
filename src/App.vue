<template>
  <div id="app">
    <div :class="isFullScreen ? 'full' : 'not-full'">
      <!-- 侧边导航栏 -->
      <div class="navigator-con">
        <navigator></navigator>
      </div>
      <!-- 内容部分 -->
      <div class="main-con">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navigator from '@/components/Navigator.vue'

export default {
  name: 'app',
  components: {
    navigator: Navigator
  }
}
</script>
<style lang="less">
@import '~@/assets/styles/less/common.less';
</style>

<template>
  <div class="card">
    <div class="card-head">
      <span class="title">{{ title }}</span>
      <span class="tip important-color">{{ tip }}</span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'card',
  props: {
    title: String,
    tip: String
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>

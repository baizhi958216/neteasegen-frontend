<template>
  <div class="container" element-loading-background="rgba(0,0,0,.6)">
    <word-cloud />
    <transparent-bar />
  </div>
  <div class="netease"></div>
</template>

<script setup lang="ts">
import WordCloud from "./components/wordcloud/index.vue";
import TransparentBar from "./components/transparentbar/index.vue";
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
.netease{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

<template>
  <div class="container" element-loading-background="rgba(0,0,0,.6)">
    <netease-cloud />
    <bilihot />
    <div class="myheader">
      <div class="myheaderimg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NeteaseCloud from "./components/neteasecloud/index.vue";
import Bilihot from "./components/bilihot/index.vue";
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url(/bg.png);
  background-size: 100%;
  background-position: center;
}
.myheader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.myheaderimg {
  background-image: url(/header.png);
  background-size: 100%;
  animation: 15s linear infinite roateme;
  width: 260px;
  height: 260px;
}
@keyframes roateme {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

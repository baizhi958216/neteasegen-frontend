<template>
  <div class="container" element-loading-background="rgba(0,0,0,.6)">
    <netease-cloud />
    <bilihot />
    <div class="myheader">
      <div class="myheaderimg">
        <a href="https://github.com/baizhi958216/neteasegen-frontend" target="_blank"></a>
      </div>
      <div class="myheaderimg1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NeteaseCloud from "./components/neteasecloud/index.vue";
import Bilihot from "./components/bilihot/index.vue";
</script>

<style scoped>
.container {
  position: fixed;
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
.myheaderimg1 {
  background-image: url(/header.png);
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: center;
  animation: 30s linear infinite roateyou;
  width: 260px;
  height: 260px;
  border-radius: 50%;
}
.myheaderimg {
  position: absolute;
  background-image: url(/github-mark.png);
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: center;
  animation: 60s linear infinite roateme;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  transition: all linear .3s;
  z-index: 1;
}
.myheaderimg a{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.myheaderimg:hover{
  background-image: url(/github-mark-white.png);
  background-size: 110%;
}
@keyframes roateme {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}
@keyframes roateyou {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

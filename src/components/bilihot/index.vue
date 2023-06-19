<template>
  <div class="iform2">
    <div style="margin-bottom: 10px">哔哩哔哩热榜可视化分析</div>

    <el-form v-loading="status">
      <el-form-item label="热榜1-100项">
        <el-input v-model="topNum" placeholder="热榜为前10" />
      </el-form-item>

      <el-button @click="createHandle" type="primary">开始分析</el-button>
    </el-form>
    <div class="boxhidden">
      <el-button :icon="ArrowHiddenIcon" circle @click="hiddenhandle" />
    </div>
  </div>
  <div class="bilihot" v-show="analyzeStore.nowUsing == 'bilihot'">
    <div class="pie"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";
import { init } from "echarts";
import { useAnalyzeStore } from "../../stores/analyzeStore";
const analyzeStore = useAnalyzeStore();

const status = ref(false);
const ArrowHiddenIcon = shallowRef(ArrowLeft);

const hiddenhandle = () => {
  const iform2 = document.querySelector(".iform2");
  if (ArrowHiddenIcon.value == ArrowLeft) {
    iform2?.classList.add("hidden");
    ArrowHiddenIcon.value = ArrowRight;
  } else if (ArrowHiddenIcon.value == ArrowRight) {
    iform2?.classList.remove("hidden");
    ArrowHiddenIcon.value = ArrowLeft;
  }
};

const topNum = ref(10);

const createHandle = async () => {
  const pie = document.querySelector(".pie") as HTMLElement;
  status.value = true;
  fetch(`http://localhost:8000/bilibilihot/${topNum.value}`)
    .then((res) => res.json())
    .then((data) => {
      const viewdata: {
        value: string | number;
        name: string;
        bv: string;
      }[] = [];
      data.map((el: any) => {
        viewdata.push({
          value: el.view,
          name: el.title,
          bv: el.bvid,
        });
      });
      const pieOption = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "热榜饼图",
            type: "pie",
            radius: [50, 110],
            center: ["50%", "40%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: viewdata,
          },
        ],
      };
      const piechart = init(pie);
      analyzeStore.nowUsing = "bilihot";
      piechart.setOption(pieOption);
      piechart.on("click", (param: any) => {
        window.open(`https://www.bilibili.com/video/${param.data.bv}`);
      });
      status.value = false;
    });
};
</script>

<style scoped>
.iform2 {
  position: relative;
  background-color: white;
  width: 20rem;
  padding: 2rem;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s;
  border: 1px solid rgba(159, 181, 255, 0.295);
  z-index: 999;
  margin-bottom: 1rem;
}
.boxhidden {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 95%;
}
.hidden {
  transform: translateX(-90%);
}
.btngroup {
  display: flex;
  justify-content: space-evenly;
}
.bilihot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100%;
  z-index: 2;
}
.pie {
  width: 660px;
  height: 430px;
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0 0 20px 3px rgb(177, 177, 177);
  border-radius: 1rem;
  margin: 2rem 4rem;
}
</style>

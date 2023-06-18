<template>
  <div class="iform2" v-loading="status">
    <div style="margin-bottom: 10px">哔哩哔哩热榜可视化分析</div>

      <el-form-item label="热榜1-100项">
        <el-input v-model="topNum" placeholder="热榜为前10" />
      </el-form-item>

    <el-button @click="createHandle" type="primary">开始分析</el-button>

    <div class="boxhidden">
      <el-button :icon="ArrowHiddenIcon" circle @click="hiddenhandle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";
import { init } from "echarts";

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

const topNum = ref(10)

const createHandle = async () => {
  const netease = document.querySelector(".netease") as HTMLElement;
  status.value = true;
  fetch("http://localhost:8000/bilibilihot")
    .then((res) => res.json())
    .then((data) => {
      const viewdata: {
        value: string | number;
        name: string;
        short_link_v2: string;
      }[] = [];
      data.data.list.slice(0, topNum.value).map((el: any) => {
        viewdata.push({
          value: el.stat.view,
          name: el.title,
          short_link_v2: el.short_link_v2,
        });
      });
      const option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: viewdata,
          },
        ],
      };
      const chart = init(netease);
      chart.setOption(option);
      chart.on("click", (param: any) => {
        window.open(param.data.short_link_v2);
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
</style>

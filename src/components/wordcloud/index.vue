<template>
  <div class="iform">
    <div style="margin-bottom: 10px">网易云听歌排行可视化分析-词云图</div>
    <el-form
      :model="formLabel"
      :rules="rules"
      style="border-radius: 10px"
      v-loading="status"
    >
      <!-- 输入组 -->
      <div class="iptgroup">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="formLabel.userId" placeholder="输入用户ID" />
        </el-form-item>
        <el-form-item label="词云背景" prop="customImage" v-show="custom">
          <el-upload
            :limit="1"
            :auto-upload="false"
            v-model:file-list="formLabel.customImage"
          >
            <template #trigger>
              <el-button>选择图片</el-button>
            </template>
          </el-upload>
        </el-form-item>
      </div>

      <!-- 按钮组 -->
      <div class="btngroup">
        <el-button type="primary" @click="submithandle(0)" :disabled="status">
          全榜
        </el-button>
        <el-button type="primary" @click="submithandle(1)" :disabled="status">
          周榜
        </el-button>
        <el-button :icon="ArrowIcon" circle @click="customhandle" />
      </div>
    </el-form>

    <div class="boxhidden">
      <el-button :icon="ArrowHiddenIcon" circle @click="hiddenhandle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from "vue";
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
} from "@element-plus/icons-vue";

const status = ref(false);
const custom = ref(false);
const ArrowIcon = shallowRef(ArrowDown);
const ArrowHiddenIcon = shallowRef(ArrowLeft);

const formLabel = reactive<{ userId: number; customImage: Array<any> }>({
  userId: 1765520249,
  customImage: [],
});

const customhandle = () => {
  formLabel.customImage = [];
  if (ArrowIcon.value == ArrowUp) {
    ArrowIcon.value = ArrowDown;
    custom.value = false;
  } else if (ArrowIcon.value == ArrowDown) {
    ArrowIcon.value = ArrowUp;
    custom.value = true;
  }
};

const hiddenhandle = () => {
  const iform = document.querySelector(".iform");
  if (ArrowHiddenIcon.value == ArrowLeft) {
    iform?.classList.add("hidden");
    ArrowHiddenIcon.value = ArrowRight;
  } else if (ArrowHiddenIcon.value == ArrowRight) {
    iform?.classList.remove("hidden");
    ArrowHiddenIcon.value = ArrowLeft;
  }
};

const rules = reactive({
  userId: [{ required: true, message: "输入用户ID" }],
  customImage: [{ required: false }],
});

const fetchImage = (image: HTMLImageElement,ranktype:number=0) => {
  console.log(`http://localhost:8000/${ranktype==1?'getweek':'genwordcloudpng'}/${formLabel.userId}`);
  
  fetch(`http://localhost:8000/${ranktype==1?'getweek':'genwordcloudpng'}/${formLabel.userId}`)
    .then((res) => res.json())
    .then((data) => {
      image.src = `http://localhost:8000/static/${data.filePath}`;
      document.querySelector(".netease")?.appendChild(image);
      status.value = false;
    });
};

const fetchCustomImage = (image: HTMLImageElement,ranktype:number=0) => {
  const formData = new FormData();
  formData.append("userId", formLabel.userId.toString());
  formData.append("imagefile", formLabel.customImage[0].raw);
  fetch(`http://localhost:8000/${ranktype==1?'getcustomweek':'gencustomcloudpng'}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      image.src = `http://localhost:8000/static/${data.filePath}`;
      document.querySelector(".netease")?.appendChild(image);
      status.value = false;
    });
};

/**
 * 
 * @param ranktype 榜单类型 1周榜 0全榜
 */
const submithandle = (ranktype:number=0) => {
  status.value = true;
  const imgcontainer = document.querySelector(".netease");
  if (imgcontainer?.childNodes.length) {
    imgcontainer.removeAttribute('_echarts_instance_')
    imgcontainer.innerHTML=''
  }
  const image = new Image();
  image.style.maxWidth = "100vw";
  image.style.maxHeight = "100vh";
  if (formLabel.customImage.length) {
    fetchCustomImage(image, ranktype);
  } else {
    fetchImage(image, ranktype);
  }
};
</script>

<style scoped>
.iform {
  position: relative;
  background-color: white;
  width: 20rem;
  padding: 2rem;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s;
  border: 1px solid rgba(159, 181, 255, 0.295);
  z-index: 999;
  top: 1rem;
  margin-bottom: 2rem;
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

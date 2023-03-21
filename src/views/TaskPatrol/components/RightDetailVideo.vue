<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "RightDetailVideo"
});
const getTime = () => {
  const date = new Date(Math.floor(Math.random() * Date.now()));
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
// 视频信息
const videoDetail = ref({
  //   发布时间
  releaseTime: getTime(),
  //   入库时间 storageTime
  storageTime: getTime(),
  //   点赞 like
  like: Math.floor(Math.random() * 1000),
  //   评论 comments
  comments: Math.floor(Math.random() * 1000),
  //   转发 forward
  forward: Math.floor(Math.random() * 1000),
  //   来源 source
  source: "userid",
  //   视频状态 videoStatus
  videoStatus: Math.floor(Math.random() * 3) + 1,
  //   aweme-id
  awemeId: Math.floor(Math.random() * 1000000000000000000).toString(),
  missionTags: ["#任务1", "任务2", "#任务3"],
  //   视频简介
  videoDescription:
    "这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信预警词1息这里是简介信息这里预警词2是简介信息这里是简介信息",
  //   封面文字
  coverText:
    "这里是简介信息这里预警词是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介预警词3信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息",
  //   声音转文字-左声道
  leftTrackTxt:
    "这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息预警词1这里是简介信息这里是简介信息这里是简介信息这里是简介信息",
  //   声音转文字-右声道
  rightTrackTxt:
    "这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这预警词2里是简介信息这里是简介信息",
  //   原视频链接,
  videoLink: "https://www.iesdouying.com/share/video/9234324321434213214214321"
});

// 右上角详情
const detailList = ref([
  {
    label: "发布时间",
    value: videoDetail.value.releaseTime
  },
  {
    label: "入库时间",
    value: videoDetail.value.storageTime
  },
  {
    label: "点赞",
    value: videoDetail.value.like
  },
  {
    label: "评论",
    value: videoDetail.value.comments
  },
  {
    label: "转发",
    value: videoDetail.value.forward
  },
  {
    label: "来源",
    value: videoDetail.value.source
  },
  {
    label: "视频状态",
    value: videoDetail.value.videoStatus
  },
  {
    label: "aweme-id",
    value: videoDetail.value.awemeId
  }
]);

// 删除任务tag
const handleClose = (tag: string) => {
  videoDetail.value.missionTags.splice(
    videoDetail.value.missionTags.indexOf(tag),
    1
  );
};
// 添加任务对话框
const addMissionsDialog = ref(false);
const showAddMissions = () => {
  addMissionsDialog.value = true;
};
// 添加任务的列表
const missionList = ref([]);
const addMissions = ref([
  {
    value: "#任务11",
    label: "任务11"
  },
  {
    value: "#任务12",
    label: "任务12"
  },
  {
    value: "#任务13",
    label: "任务13"
  },
  {
    value: "#任务14",
    label: "任务14"
  },
  {
    value: "#任务15",
    label: "任务15"
  }
]);
// 添加任务function
const addMissionsFn = () => {
  if (missionList.value.length) {
    missionList.value.map(item => {
      videoDetail.value.missionTags.push(item);
    });
    closeMissionDialog();
  } else {
    ElMessage({
      message: "请选择你要添加的任务",
      type: "warning"
    });
  }
};
// 关闭添加任务对话框
const closeMissionDialog = () => {
  addMissionsDialog.value = false;
  missionList.value = [];
};

// 预警词列表
const warningWords = ["预警词1", "预警词2", "预警词3"];
// 高亮预警词
const highlightWarningWords = (text: string): string => {
  for (const warningWord of warningWords) {
    const regex = new RegExp(warningWord, "g");
    text = text.replace(
      regex,
      `<span class="warning_red">${warningWord}</span>`
    );
  }
  return text;
};
</script>

<template>
  <div class="right_detail_video">
    <div class="title">
      <h4>视频信息</h4>
    </div>
    <div class="video_top">
      <div class="video_top_l">
        <div>
          <div class="video_detail_title">
            <font-icon icon="icon-yujing" />
            预警信息
          </div>
          <div class="video_mission">
            <el-tag
              v-for="tag in videoDetail.missionTags"
              :key="tag"
              class="mx-1"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-button
              class="button-new-tag ml-1"
              size="small"
              @click="showAddMissions"
            >
              + 添加到任务
            </el-button>
            <el-dialog
              v-model="addMissionsDialog"
              title="添加到任务"
              width="30%"
            >
              <el-select
                v-model="missionList"
                placeholder="请选择任务.."
                multiple
              >
                <el-option
                  v-for="item in addMissions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
              <p>*添加成功后该任务将作为任务的命中数据在任务列表可见</p>
              <template #footer>
                <el-button type="primary" @click="addMissionsFn">
                  保存
                </el-button>
                <el-button @click="closeMissionDialog"> 取消 </el-button>
              </template>
            </el-dialog>
          </div>
          <div class="video_warning">
            <span class="warning_red" v-for="item in warningWords" :key="item">
              {{ item }}
            </span>
          </div>
        </div>
        <div>
          <div class="video_detail_title">
            <font-icon icon="icon-jianjie" />
            视频简介
          </div>
          <div
            class="video_content"
            v-html="highlightWarningWords(videoDetail.videoDescription)"
          />
        </div>
      </div>
      <div class="video_top_r">
        <div v-for="(item, index) in detailList" :key="index">
          <span
            >{{ item.label }}
            <font-icon v-if="item.label === '点赞'" icon="icon-dianzan" />
            <font-icon v-else-if="item.label === '评论'" icon="icon-pinglun" />
            <font-icon v-else-if="item.label === '转发'" icon="icon-zhuanfa" />
          </span>
          <template v-if="item.label === '视频状态'">
            <i>{{
              item.value === 1
                ? "未下载"
                : item.value === 2
                ? "已下载"
                : "已清理"
            }}</i>
            <font-icon v-if="item.value === 1" icon="icon-xiazai" />
            <font-icon
              v-else-if="item.value === 2"
              icon="icon-xiazai"
              style="color: #52c41a"
            />
            <font-icon v-else icon="icon-qingli" />
          </template>
          <i v-else :class="{ is_link: item.label === '来源' }">{{
            item.value
          }}</i>
        </div>
      </div>
    </div>
    <div class="video_bottom">
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-fengmian" />
          封面文字
        </div>
        <div
          class="video_content"
          v-html="highlightWarningWords(videoDetail.coverText)"
        />
      </div>
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-shengyin" />
          声音转文字-左声道
        </div>
        <div
          class="video_content"
          v-html="highlightWarningWords(videoDetail.leftTrackTxt)"
        />
      </div>
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-shengyin" />
          声音转文字-右声道
        </div>
        <div
          class="video_content"
          v-html="highlightWarningWords(videoDetail.rightTrackTxt)"
        />
      </div>
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-link" />
          原视频链接
        </div>
        <div class="video_content">
          <span>
            {{ videoDetail.videoLink }}
          </span>
          <a href="javascript:void(0);">复制链接</a>
          <a href="javascript:void(0);">更多</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right_detail_video {
  margin: 25px 0;

  .title {
    margin-bottom: 20px;
  }

  .video_detail_title {
    font-size: 20px;
    color: #595959;

    .iconfont {
      font-size: 24px;
      color: #000;
    }
  }

  .video_mission {
    margin: 15px 0;

    .el-tag {
      background: transparent;
      border: none;
    }

    .el-select {
      width: 100%;
    }

    p {
      font-size: 14px;
      color: #8c8c8c;
      margin-top: 15px;
    }
  }

  .video_warning {
    margin-bottom: 20px;

    span {
      font-size: 14px;
      color: #fff;
      background: #ff4d4f;
      border-radius: 5px;
      padding: 5px;
      margin-right: 5px;
    }
  }

  .video_content {
    margin-top: 5px;

    a {
      color: #1890ff;
      margin-left: 15px;
    }
  }

  .video_top {
    display: flex;

    margin-bottom: 15px;

    &_r {
      width: 600px;
      border-left: 1px solid #d9d9d9;
      padding: 10px 0 0 40px;
      margin-left: 35px;

      span {
        display: inline-block;
        width: 100px;
        color: #8c8c8c;

        .iconfont {
          font-size: 12px;
        }
      }

      i {
        color: #595959;
      }

      .is_link {
        color: #1890ff;
      }

      .iconfont {
        font-size: 18px;
        margin-left: 5px;
      }
    }
  }

  .video_bottom {
    &_content {
      margin-bottom: 15px;
    }
  }
}
</style>

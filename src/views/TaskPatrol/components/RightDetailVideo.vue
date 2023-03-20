<script lang="ts" setup>
import { ref } from "vue";

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
  awemeId: Math.floor(Math.random() * 1000000000000000000).toString()
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
console.log(videoDetail.value);
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
          <div class="video_mission">任务</div>
          <div class="video_warning">预警词</div>
        </div>
        <div>
          <div class="video_detail_title">
            <font-icon icon="icon-jianjie" />
            视频简介
          </div>
          <div class="video_content">
            这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息
          </div>
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
        <div class="video_content">
          这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息
        </div>
      </div>
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-shengyin" />
          声音转文字-左声道
        </div>
        <div class="video_content">
          这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息
        </div>
      </div>
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-shengyin" />
          声音转文字-右声道
        </div>
        <div class="video_content">
          这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息
        </div>
      </div>
      <div class="video_bottom_content">
        <div class="video_detail_title">
          <font-icon icon="icon-link" />
          原视频链接
        </div>
        <div class="video_content">
          <span
            >http://www.iesdouying.com/share/video/9234324321434213214214321</span
          >
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
  }

  .video_warning {
    margin-bottom: 20px;
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

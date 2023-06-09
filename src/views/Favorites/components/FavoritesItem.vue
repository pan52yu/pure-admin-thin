<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { getRandomTime } from "@/utils/tools";
import { FavoriteType } from "@/types/data";
import { VIDEO_INFO } from "@/utils/enum";

defineOptions({
  name: "FavoritesItem"
});
defineProps({
  //   是否为视频收藏
  isVideoCollection: {
    type: Boolean,
    default: false
  },
  //   是否为视频下载
  isVideoDownload: {
    type: Boolean,
    default: false
  }
});
// 全选标签
const checkAll = computed({
  get() {
    const selectedCount = videoDetail.value.filter(
      item => item.isSelected
    ).length;
    if (selectedCount === 0) {
      return false; // 没有选中
    } else if (selectedCount === videoDetail.value.length) {
      return true; // 全部选中
    } else {
      return null; // 部分选中
    }
  },
  set(val) {
    // 全选或者取消全选
    videoDetail.value.forEach(item => {
      item.isSelected = val;
    });
  }
});

// 收藏夹视频列表
const videoDetail = ref<FavoriteType[]>([]);

// 枚举视频收藏右侧的视频信息
const detailList = VIDEO_INFO;

// 获取视频信息列表
const getVideoDetail = () => {
  for (let i = 0; i < 3; i++) {
    videoDetail.value.push({
      id: i + 1,
      videoUrl: `https://picsum.photos/id/${Math.floor(
        Math.random() * 1000
      )}/200/200`,
      userName: `userName${i + 1}`,
      userIntroduction: `userName${i + 1}`,
      hitList: [`命中词${i * 2 + 1}`, `命中词${i * 2 + 2}`],
      sameCityList: [`同城${i * 2 + 1}`, `同城${i * 2 + 2}`],
      labelList: [`标签${i * 2 + 1}`, `标签${i * 2 + 2}`],
      releaseTime: getRandomTime(),
      playNum: getRandomTime(),
      likeNum: Math.floor(Math.random() * 10000),
      commentNum: Math.floor(Math.random() * 10000),
      forwardNum: Math.floor(Math.random() * 10000),
      videoSource: `userid${i + 1}`,
      videoStatus: Math.floor(Math.random() * 3) + 1,
      awemeId: 9876625612 + i,
      isCollection: Math.random() > 0.5,
      isSelected: false,
      isDownload: Math.random() > 0.5
    });
  }
};
// 视频信息总数
const videoDetailTotal = computed(() => videoDetail.value.length);
// 选中的视频信息数量
const videoDetailSelected = computed(() => {
  return videoDetail.value.filter(item => item.isSelected).length;
});
onMounted(() => {
  getVideoDetail();
});
</script>

<template>
  <div class="favorites_item">
    <header class="flex-bc px-6">
      <div>
        <el-checkbox v-model="checkAll" :indeterminate="checkAll === null" />
        <span class="ml-4"
          >共 {{ videoDetailTotal }} 条 已选 {{ videoDetailSelected }} 条</span
        >
      </div>
      <div>
        <el-button>修改标签</el-button>
        <el-button>导出到Excel</el-button>
      </div>
    </header>
    <div
      class="favorites_item_content flex px-6"
      v-for="item in videoDetail"
      :key="item"
    >
      <el-checkbox v-model="item.isSelected" />
      <el-image class="content_img" :src="item.videoUrl" />
      <div class="user_info">
        <div class="user_info_top">
          <font-icon icon="icon-douyin" />
          <span>{{ item.userName }}</span>
        </div>
        <div class="user_info_introduction">
          {{ item.userIntroduction }}
        </div>
        <div>
          <span>命中</span>
          <i class="mr-1.5" v-for="item in item.hitList" :key="item.id">
            {{ item }}
          </i>
        </div>
        <div>
          <span>同城</span>
          <a
            class="mr-1.5"
            href="javascript:void(0);"
            v-for="item in item.sameCityList"
            :key="item"
          >
            {{ item }}
          </a>
        </div>
        <div>
          <span>标签</span>
          <i class="mr-1.5" v-for="item in item.labelList" :key="item">{{
            item
          }}</i>
          <el-button size="small">添加</el-button>
        </div>
      </div>
      <div class="space" />
      <div class="video_detail">
        <div class="video_detail_l">
          <p v-for="ite in detailList" :key="ite.label">
            <span
              >{{ ite.label }}<font-icon v-if="ite.icon" :icon="ite.icon"
            /></span>
            <i
              v-if="ite.label !== '视频状态'"
              :class="{ is_link: ite.label === '视频来源' }"
              >{{ item[ite.value] }}</i
            >
            <i v-else
              >{{
                item[ite.value] === 1
                  ? "未下载"
                  : item[ite.value] === 2
                  ? "已下载"
                  : "已清理"
              }}
              <font-icon v-if="item[ite.value] === 1" icon="icon-xiazai" />
              <font-icon
                v-else-if="item[ite.value] === 2"
                icon="icon-xiazai"
                style="color: #52c41a"
              />
              <font-icon v-else icon="icon-qingli" />
            </i>
          </p>
        </div>
        <div class="video_detail_r">
          <template v-if="isVideoCollection">
            <el-button v-if="item.isCollection" type="info" plain
              >取消收藏
            </el-button>
            <el-button v-else type="primary">收藏</el-button>
          </template>
          <el-button type="primary">查看视频</el-button>
          <el-button v-if="item.isDownload">下载视频</el-button>
          <el-button v-else>保存视频</el-button>
          <el-button>保存报告</el-button>
          <el-button v-if="isVideoDownload" type="info" plain
            >删除记录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorites_item {
  header {
    height: 63px;
    background: #fafafa;
  }

  &_content {
    margin-bottom: 32px;

    .content_img {
      margin-left: 15px;
      width: 200px;
      height: 250px;
    }

    .user_info {
      flex: 1;
      margin-left: 20px;
      padding: 10px;
      font-size: 14px;

      &_introduction {
        display: -webkit-box;
        overflow: hidden;
        margin: 15px 0 !important;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }

      > div {
        margin: 5px 0;

        span,
        .iconfont {
          margin-right: 10px;
          color: #8c8c8c;
        }
      }

      a {
        color: #1890ff;
      }

      .el-button {
        margin-left: 15px;
      }
    }

    .space {
      margin: 0 20px;
      width: 1px;
      background: #d9d9d9;
    }

    .video_detail {
      display: flex;
      padding: 25px 10px 10px;
      width: 38%;
      font-size: 14px;

      &_l {
        flex: 1;

        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 4px 0;

          span {
            margin-right: 20px;
            width: 70px;
            color: #8c8c8c;

            .iconfont {
              margin-left: 5px;
              font-size: 14px;
              color: #8c8c8c;
            }
          }

          i {
            flex: 1;
            color: #595959;
          }

          .is_link {
            color: #1890ff;
          }
        }
      }

      &_r {
        width: 80px;

        .el-button {
          margin-bottom: 12px;
          width: 88px;
        }

        .el-button + .el-button {
          margin-left: 0;
        }
      }
    }
  }
}
</style>

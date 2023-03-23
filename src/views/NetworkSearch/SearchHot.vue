<script setup lang="ts">
import TopBanner from "./components/TopBanner.vue";
defineOptions({
  name: "SearchHot"
});
</script>

<template>
  <div class="network_search">
    <top-banner />
    <el-card>
      <div class="card_content">
        <!-- 抖音热门视频 -->
        <div class="content_left">
          <div class="content_left_title">抖音热门视频</div>
          <div>
            <table>
              <tbody>
                <tr class="table_title">
                  <td class="table_l">排名</td>
                  <td class="table_c">视频</td>
                  <td class="table_r">热度</td>
                </tr>
                <tr v-for="item in 20" :key="item">
                  <td class="table_l ranking">{{ item }}</td>
                  <td class="table_c video_link">
                    <a href="javaScript:;">500年古玉兰花灿烂盛开</a>
                  </td>
                  <td class="table_r">4490111</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 最近搜索 -->
        <div class="content_center">
          <div class="content_center_title">最近搜索</div>
          <div class="content_center_link" v-for="item in 10" :key="item">
            <a href="javaScript:;">500年古玉兰花灿烂盛开</a>
          </div>
        </div>
        <!-- 系统更新日志 -->
        <div class="content_right">
          <div class="content_right_title">系统更新日志</div>
          <div class="update_log" v-for="item in 2" :key="item">
            <div class="update_log_title">v{{ item }}.0.0 2023-03-02</div>
            <p>1、优化采集速度</p>
            <p>2、优化体验</p>
          </div>
          <a href="javaScript:;">更多</a>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.network_search {
  margin: 0;

  a {
    color: #1890ff;
  }

  .el-card {
    margin: 33px 23px 128px;

    .card_content {
      display: flex;
      align-items: flex-start;
      padding: 49px 22px;

      .content_left {
        width: 580px;

        &_title {
          margin-bottom: 10px;
          line-height: 32px;
          font-size: 24px;
          color: #000000;
        }

        table {
          width: 100%;
          font-size: 16px;

          tr {
            display: flex;
            color: #8c8c8c;

            .table_l {
              width: 60px;
            }

            .table_c {
              flex: 1;
            }

            .table_r {
              width: 110px;
            }

            .ranking {
              color: #fa8c16;
            }

            .video_link {
              color: #1890ff;
            }
          }

          .table_title {
            color: #8c8c8c;
          }
        }
      }

      .content_center {
        flex: 1;
        margin: 0 23px;

        &_title {
          margin-bottom: 40px;
          line-height: 32px;
          font-size: 24px;
          color: #000000;
        }

        &_link {
          margin-bottom: 5px;
        }
      }

      .content_right {
        padding: 24px 0 24px 57px;
        border-radius: 5px;
        width: 432px;

        background: #e6f7ff;

        &_title {
          line-height: 32px;
          font-weight: 700;
          font-size: 24px;
        }

        .update_log {
          margin: 20px 0;
          font-size: 16px;

          &_title {
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>

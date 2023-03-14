// 最简代码，也就是这些字段必须有
export default {
  path: "/taskPatrol",
  meta: {
    title: "任务巡查",
    rank: 102
  },
  children: [
    {
      path: "/taskPatrol",
      name: "TaskPatrol",
      component: () => import("@/views/TaskPatrol/index.vue"),
      meta: {
        title: "任务巡查"
      }
    }
  ]
} as RouteConfigsTable;

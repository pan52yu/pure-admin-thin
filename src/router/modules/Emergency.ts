export default {
  path: "/emergency",
  meta: {
    title: "突发事件",
    rank: 103
  },
  children: [
    {
      path: "/emergency",
      name: "Emergency",
      component: () => import("@/views/Emergency/index.vue"),
      meta: {
        title: "突发事件"
      }
    },
    // 新建突发事件
    {
      path: "/emergency/add",
      name: "EmergencyAdd",
      component: () => import("@/views/Emergency/addEmergency.vue"),
      meta: {
        title: "新建突发事件",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;

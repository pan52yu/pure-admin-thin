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
    }
  ]
} as RouteConfigsTable;

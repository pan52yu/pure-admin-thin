export default {
  path: "/toolbox",
  meta: {
    title: "工具箱",
    rank: 106
  },
  children: [
    {
      path: "/toolbox",
      name: "Toolbox",
      meta: {
        title: "工具箱"
      },
      component: () => import("@/views/Toolbox/index.vue")
    }
  ]
} as RouteConfigsTable;

export default {
  path: "/database",
  meta: {
    title: "属地数据库",
    rank: 104
  },
  children: [
    {
      path: "/database",
      name: "Database",
      component: () => import("@/views/Database/index.vue"),
      meta: {
        title: "属地数据库"
      }
    }
  ]
} as RouteConfigsTable;

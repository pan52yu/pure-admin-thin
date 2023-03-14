export default {
  path: "/favorites",
  meta: {
    title: "收藏夹",
    rank: 105
  },
  children: [
    {
      path: "/favorites",
      name: "Favorites",
      component: () => import("@/views/Favorites/index.vue"),
      meta: {
        title: "收藏夹"
      }
    }
  ]
} as RouteConfigsTable;

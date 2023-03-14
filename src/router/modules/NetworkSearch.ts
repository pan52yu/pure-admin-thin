// 最简代码，也就是这些字段必须有
export default {
  path: "/networkSearch",
  meta: {
    title: "全网速搜",
    rank: 101
  },
  children: [
    {
      path: "/networkSearch",
      name: "NetworkSearch",
      component: () => import("@/views/NetworkSearch/index.vue"),
      meta: {
        title: "全网速搜"
      }
    },
    {
      path: "/networkSearch/results",
      name: "NetworkSearchResults",
      component: () =>
        import("@/views/NetworkSearch/components/SearchResults.vue"),
      meta: {
        title: "全网速搜2"
      }
    }
  ]
} as RouteConfigsTable;

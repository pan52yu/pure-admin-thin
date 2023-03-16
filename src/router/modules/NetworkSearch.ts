// 最简代码，也就是这些字段必须有
export default {
  path: "/networkSearch",
  component: () => import("@/views/NetworkSearch/index.vue"),
  redirect: "/networkSearch/hot",
  meta: {
    title: "全网速搜",
    rank: 101
  },
  children: [
    {
      path: "/networkSearch/hot",
      name: "NetworkSearchHot",
      component: () => import("@/views/NetworkSearch/SearchHot.vue"),
      meta: {
        title: "全网速搜"
      }
    },
    {
      path: "/networkSearch/results",
      name: "NetworkSearchResults",
      component: () => import("@/views/NetworkSearch/SearchResults.vue"),
      meta: {
        title: "全网速搜 ",
        showLink: false
      }
    },
    {
      path: "/networkSearch/network",
      name: "SearchNetwork",
      component: () => import("@/views/NetworkSearch/SearchNetwork.vue"),
      meta: {
        title: "搜全网",
        showLink: false
      }
    },
    {
      path: "/networkSearch/station",
      name: "SearchStation",
      component: () => import("@/views/NetworkSearch/SearchStation.vue"),
      meta: {
        title: "搜全站",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;

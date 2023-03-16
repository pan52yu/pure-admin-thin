import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/networkSearch",
  meta: {
    icon: "homeFilled",
    title: $t("menus.hshome"),
    rank: 0,
    showLink: false
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.hshome")
      }
    }
  ]
} as RouteConfigsTable;

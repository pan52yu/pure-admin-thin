import { defineStore } from "pinia";

export const useSearchTabs = defineStore({
  id: "pure-search",
  state: () => ({
    searchLabs: "",
    // 倒计时是否结束
    endOfCountdown: false
  }),
  actions: {
    setSearchLabs(lab) {
      this.searchLabs = lab;
    },
    setEndOfCountdown(bool) {
      this.endOfCountdown = bool;
    }
  }
});

import { defineStore } from "pinia";

export const useSearchTabs = defineStore({
  id: "pure-search",
  state: () => ({
    searchLabs: ""
  }),
  actions: {
    setSearchLabs(lab) {
      this.searchLabs = lab;
    }
  }
});

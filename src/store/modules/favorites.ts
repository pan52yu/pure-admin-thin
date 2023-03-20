import { defineStore } from "pinia";
import { ListType } from "@/types/data";

export const useFavorites = defineStore({
  id: "pure-favorites",
  state: () => ({
    favoritesList: []
  }),
  actions: {
    setFavoritesList(favoritesList) {
      console.log(favoritesList);
      const favorites: ListType[] = [];
      for (let i = 0; i < 9; i++) {
        const newItem: ListType = {
          url: `https://picsum.photos/id/${Math.floor(
            Math.random() * 100
          )}/200/200`,
          title: `Title ${i + 1}`,
          loading: i % 2 === 0,
          avatar: `https://picsum.photos/id/${Math.floor(
            Math.random() * 100
          )}/50/50`,
          name: `User ${i + 1}`,
          dianzan: Math.floor(Math.random() * 100),
          pinglun: Math.floor(Math.random() * 100),
          zhuanfa: Math.floor(Math.random() * 100),
          time: "2023-03-09 10:42:34",
          favoriteStatus: i % 2 === 0,
          id: Math.floor(Math.random() * 100)
        };
        favorites.push(newItem);
      }
      this.favoritesList = favorites;
    }
  }
});

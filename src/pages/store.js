import create from "zustand";
import { persist } from "zustand/middleware";

const useHashtagStore = create(
  persist(
    (set) => ({
      hashtags: [],
      addHashtag: (newHashtag) =>
        set((state) => ({ hashtags: [...state.hashtags, newHashtag] })),
      removeHashtag: (hashtagToRemove) =>
        set((state) => ({
          hashtags: state.hashtags.filter(
            (hashtag) => hashtag !== hashtagToRemove
          ),
        })),
      clearHashtags: () => set({ hashtags: [] }),
    }),
    {
      name: "hashtags", // unique name for localStorage
      getStorage: () => localStorage, // specify localStorage as the storage
    }
  )
);

export default useHashtagStore;

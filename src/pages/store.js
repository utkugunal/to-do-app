import { create } from "zustand";
import { persist } from "zustand/middleware";

let storage;
if (typeof window !== "undefined") {
  storage = localStorage; // Use localStorage if in browser environment
}

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
      storage,
    }
  )
);

export default useHashtagStore;

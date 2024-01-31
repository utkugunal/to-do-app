import UpperButton from "@/components/UpperButton/UpperButton";
import Link from "next/link";
import { useRouter } from "next/router";
import useHashtagStore from "@/pages/store";
import { useState } from "react";

export default function AddTags() {
  const router = useRouter();
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const { hashtags, addHashtag, removeHashtag } = useHashtagStore();

  function handleHashtagClick(hashtag) {
    if (selectedHashtag === hashtag) {
      setSelectedHashtag(null);
    } else {
      setSelectedHashtag(hashtag);
    }
  }

  function handleRemove() {
    if (selectedHashtag) {
      removeHashtag(selectedHashtag);
      setSelectedHashtag(null);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let newHashtag = data.hashtag.trim();
    if (!newHashtag.startsWith("#")) {
      newHashtag = "#" + newHashtag;
    }

    addHashtag(newHashtag);
    event.target.reset();

    console.log("hashtags:", useHashtagStore.getState().hashtags);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-between items-center h-24">
            <Link
              href="/new"
              className="border border-black p-1 m-4 mr-20 ml-20 rounded-md w-16 h-8 flex justify-center items-center"
            >
              Back
            </Link>
            <h2 className="text-2xl">Tags</h2>
            <div style={{ width: "250px" }}>
              {" "}
              {/* Placeholder to balance the layout */}
            </div>
          </div>

          <div className="flex flex-row flex-wrap overflow-y-auto border border-gray-300 p-1 mt-4 mb-2 rounded-md w-72 h-24">
            {hashtags.map((item, index) => (
              <span
                key={index}
                onClick={() => handleHashtagClick(item)}
                className={`bg-blue-500 text-white text-sm p-1 m-1 rounded-md h-7 ${
                  selectedHashtag === item ? "bg-blue-700" : ""
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <input
            id="hashtag"
            name="hashtag"
            type="text"
            placeholder="Add #hashtag"
            required
            className="border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72 h-8"
          ></input>

          <div className="flex flex-row justify-center w-72">
            <UpperButton type="submit">Add</UpperButton>
            <UpperButton type="button" onClick={handleRemove}>
              Remove
            </UpperButton>
          </div>
        </div>
      </form>
    </>
  );
}

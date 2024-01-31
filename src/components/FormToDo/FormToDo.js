import UpperButton from "@/components/UpperButton/UpperButton";
import useHashtagStore from "@/pages/store";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useLocalStorageState from "use-local-storage-state";

export default function FormToDo() {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [todos, setTodos] = useLocalStorageState("todos", {
    defaultValue: [],
  });

  const [showHashtagInput, setShowHashtagInput] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState(null);

  const { hashtags, addHashtag, removeHashtag, clearHashtags } =
    useHashtagStore();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newTodo = {
      todo: data.todo,
      date: date ? date.toLocaleDateString() : "",
      priority: formData.get("priority") === "on",
      hashtags: hashtags,
    };

    setTodos([...todos, newTodo]);
    event.target.reset();
    setDate(null);
    clearHashtags();

    console.log("todos:", todos);
  }

  function handleCancel() {
    router.push("/");
  }

  function handleHashtagClick(hashtag) {
    // ... existing logic
  }

  function handleHashtagSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    let newHashtag = data.hashtag.trim();
    if (!newHashtag.startsWith("#")) {
      newHashtag = "#" + newHashtag;
    }
    addHashtag(newHashtag);
    event.target.reset();
  }

  function handleRemoveHashtag() {
    // ... existing logic
  }

  return (
    <div>
      <style>
        {`
          input:checked ~ .dot {
            transform: translateX(1rem);
          }
        `}
      </style>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex flex-row h-24 justify-center mt-8">
            <UpperButton type="button" onClick={handleCancel}>
              Cancel
            </UpperButton>
            <div style={{ width: "150px" }}>
              {" "}
              {/* Placeholder to balance the layout */}
            </div>
            <UpperButton type="submit">Add</UpperButton>
          </div>
          <div className="flex flex-col h-11 items-center">
            <input
              id="todo"
              name="todo"
              type="text"
              placeholder="To-Do"
              required
              className="border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72"
            ></input>

            <label className="flex justify-between cursor-pointer border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72">
              <div className="flex items-center text-gray-400 font-small">
                Priority
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  name="priority"
                  className="sr-only peer"
                />
                <div className="block bg-gray-400 peer-checked:bg-blue-500 w-11 h-7 rounded-full transition-colors duration-300"></div>
                <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300"></div>
              </div>
            </label>

            <DatePicker
              className="border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72"
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd.MM.yyyy"
              placeholderText="Date"
            />

            <Link
              href="/new/tags"
              className="border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72 text-gray-400 font-small"
            >
              Tags
              <div className="flex flex-row flex-wrap overflow-y-auto m-1 h-8">
                {hashtags.map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white text-sm p-1 m-1 rounded-md h-7"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

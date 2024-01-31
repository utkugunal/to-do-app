import UpperButton from "@/components/UpperButton/UpperButton";
import useHashtagStore from "@/pages/store";
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
    setShowHashtagInput(false);

    console.log("todos:", todos);
  }

  function handleCancel() {
    router.push("/");
  }

  function toggleHashtagInput() {
    if (!showHashtagInput) {
      setShowHashtagInput(true);
    }
  }

  function handleRemove() {
    if (selectedHashtag) {
      removeHashtag(selectedHashtag);
      setSelectedHashtag(null);
    }
  }

  function handleHashtagSubmit(e) {
    e.preventDefault();
    const formDataHashtag = new FormData(e.target);
    const dataHastag = Object.fromEntries(formDataHashtag);

    let newHashtag = dataHastag.hashtag.trim();
    if (!newHashtag.startsWith("#")) {
      newHashtag = "#" + newHashtag;
    }

    addHashtag(newHashtag);
    e.target.reset();

    console.log("hashtags:", useHashtagStore.getState().hashtags);
  }

  function handleHashtagClick(hashtag) {
    if (selectedHashtag === hashtag) {
      setSelectedHashtag(null);
    } else {
      setSelectedHashtag(hashtag);
    }
  }

  return (
    <div className="flex flex-col">
      <style>
        {`
          input:checked ~ .dot {
            transform: translateX(1rem);
          }
        `}
      </style>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col ">
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

            <div
              className="border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72 text-gray-400 font-small"
              onClick={toggleHashtagInput}
            >
              Tags
              <div className="flex flex-row flex-wrap overflow-y-auto m-1 h-8">
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
            </div>
          </div>
        </div>
      </form>

      {showHashtagInput && (
        <form
          onSubmit={handleHashtagSubmit}
          className="flex flex-col items-center mt-48"
        >
          <input
            id="hashtag"
            name="hashtag"
            type="text"
            placeholder="Add #hashtag"
            required
            className="border border-gray-300 p-1 m-2 mr-16 ml-16 rounded-md w-72 h-8"
          ></input>

          <div className="flex flex-row justify-center w-72">
            <button
              type="submit"
              className="border  border-blue-500 text-blue-500  pl-6 pr-6 m-1 mr-8 ml-6 rounded-md w-18 h-8 flex justify-center items-center"
            >
              Add#
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="border border-red-500 text-red-500 pl-6 pr-6 m-1 mr-6 ml-6 rounded-md w-18 h-8 flex justify-center items-center"
            >
              Remove#
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

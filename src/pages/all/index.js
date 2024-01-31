import NewButton from "@/components/NewButton/NewButton";
import SearchBar from "@/components/SearchBar/SearchBar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosFlag } from "react-icons/io";

export default function All() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center">
        <Link
          href="/"
          className="border border-black p-1 m-4 mr-20 ml-20 rounded-md w-16 h-8 flex justify-center items-center"
        >
          <FaArrowLeft /> &nbsp;Lists
        </Link>
        <div style={{ width: "240px" }}>
          {" "}
          {/* Placeholder to balance the layout */}
        </div>
      </div>
      <div>
        <h1 className=" text-4xl">All</h1>
        <div style={{ width: "280px" }}>
          {" "}
          {/* Placeholder to balance the layout */}
        </div>
      </div>
      <SearchBar className="" />

      <div className="mt-5 flex flex-col w-72">
        {todos.map((item, index) => (
          <div key={index} className="flex flex-row justify-between mt-1">
            <div className="">
              <div className="txt-base">{item.todo}</div>
              <div className="text-gray-400 text-sm">
                {item.date ? item.date : "No date"}
              </div>
            </div>
            <div className="flex flex-row pt-1">
              <div className="hashtags">
                {item.hashtags &&
                  item.hashtags.map((hashtag, idx) => (
                    <span key={idx} className="hashtag text-blue-400 text-sm">
                      {hashtag}
                    </span>
                  ))}
              </div>
              <div style={{ width: "10px" }}>
                {" "}
                {/* Placeholder to balance the layout */}
              </div>
              <div>
                {item.priority && (
                  <span>
                    <IoIosFlag className="h-6 w-6 fill-orange-600" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <NewButton />
    </div>
  );
}

"use client";
import { MdOutlineDataObject } from "react-icons/md";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { FaRegNoteSticky } from "react-icons/fa6";

import Link from "next/link";
import React, { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [active, setActive] = useState(0);

  const handleClick = (newIndex) =>{
    setActive(newIndex);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dataName = [
    {
      name: "Promise And Async/Await",
      icon: <MdOutlineDataObject className={"text-2xl"} />,
      link: "/basic_fetchApi",
    },
    {
      name: "fetch Api with useState and useEffect",
      icon: <MdOutlineDataObject className={"text-2xl"} />,
      link: "/public_fetchApi",
    },
    {
      name: "API Concept",
      icon: <MdOutlineDataObject className={"text-2xl"} />,
      link: "/concept",
    },
    {
      name: "fetch Api  using Async/Await with useState and useEffect",
      icon: <MdOutlineDataObject className={"text-2xl"} />,
      link: "/public_2_fetchApi",
    },
    {
      name: "Exercise 1 (GET): Async/Await with useState and useEffect",
      icon: <FaRegNoteSticky className={"text-2xl"} />,
      link: "/exercise_1",
    },
    {
      name: "Exercise 2 (GET): Pokemon API Fetch Data",
      icon: <FaRegNoteSticky className={"text-2xl"} />,
      link: "/exercise_2",
    },
    {
      name: "Exercise 3 (GET): Weather API Fetch Data",
      icon: <FaRegNoteSticky className={"text-2xl"} />,
      link: "/exercise_3",
    },
    {
      name: "Exercise 4 (GET): Hourly Forecast Fetch API",
      icon: <FaRegNoteSticky className={"text-2xl"} />,
      link: "/exercise_4",
    },
    {
      name: "Exercise 5 (POST): Basic Post API",
      icon: <FaRegNoteSticky className={"text-2xl"} />,
      link: "/exercise_5",
    },
  ];

  return (
    <div
      className={`overflow-hidden  flex flex-col border border-black h-[100vh] ${
        isSidebarOpen ? "w-64" : "w-16"
      } transition-width duration-300 ease-in-out`}
    >
      <button
        className="py-2 text-white bg-gray-800 hidden sm:block "
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <BiCollapse className="m-auto text-2xl" />
        ) : (
          <BiExpand className="m-auto text-2xl " />
        )}
      </button>

      <div className="text-center ">
        {/* Your sidebar items go here */}
        {dataName.map((item, index) => {
          return (
            <Link href={item.link} key={index}>
              <div onClick={() => handleClick(index)} className={ `${active === index ? 'bg-blue-300':'' } hover:bg-blue-300 cursor-pointer py-3 flex justify-center items-center `}>
                {isSidebarOpen ? item.name : item.icon}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
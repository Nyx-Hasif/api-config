"use client";
import { asset } from "@/public/asset";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: '',
    category: "",
  });

  //   GET method
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFormData(json);
    } catch (error) {
      console.log("error:", error);
    }
  };

  //   PUT method
  const fetchData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.log("Fetch error:", error);
      throw error;
    }
  };

  //   handleinput

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetchData(
        "https://fakestoreapi.com/products/7",
        formData
      );
      console.log("Success:", result);
      if (result.id) {
        setData(result);
        alert("Data Berjaya Dikemaskini Sila Tekan F12 untuk melihat output");
      }
    } catch (error) {
      console.log("Submit error:", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? value || null : value,
    }));
  };

  useEffect(() => {
    getData("https://fakestoreapi.com/products/7");
    if (data) {
      console.log("Success retrieved Data from setState:", data);
      alert("Success retrieved Data from setState");
    }
  }, [data]);

  return (
    <div className="flex flex-1 flex-col h-screen overflow-auto gap-8 border-2 border-black">
      {/* result after submit update */}
      <div className="flex flex-col gap-4 border border-black px-4 py-4 h-fit lg:mx-20 mt-20">
        <p className="font-bold">title :{data?.title}</p>
        <p className="font-bold">price :{data?.price}</p>
        <p className="font-bold">description :{data?.description}</p>
        <p className="font-bold">image :{data?.image}</p>
        <p className="font-bold">category :{data?.category}</p>
      </div>

      {/* form Update */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-black px-4 py-4 h-fit mx-auto w-[300px] lg:min-w-[800px]  "
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="title"
          className="px-4 border border-black outline-none"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="price"
          className="px-4 border border-black outline-none"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="description"
          className="px-4 border border-black outline-none"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="image"
          className="px-4 border border-black outline-none"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="category"
          className="px-4 border border-black outline-none"
        />
        <button type="submit" className="px-4 py-2 border border-black w-fit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Page;

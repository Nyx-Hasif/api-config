'use client'
import { asset } from '@/public/asset';
import Image from 'next/image';
import React, { useState } from 'react'

const Page = () => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    // save result in state
    const [postdata,setPostData] = useState(null);
  

    const fetchData = async (url, data) => {
     try {
         const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }

      return response.json(); // result = response.json() menukar response HTTP kepada JavaScript object

     } catch (error) {
       console.log("Fetch error:", error);
       throw error; // Propagate error
     }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await fetchData('https://fakestoreapi.com/products',{title:title.trim(), price:price.trim(), description:desc.trim(), image:img, category:category.trim()});
            // Handle success
            setPostData(result);
            console.log("Data received from API:", postdata);
            console.log("Success:", result);
            // Show success message to user
            alert('Data Berhasil Sila Tekan F12 untuk melihat output');
            //reset input value
            setTitle('');
            setPrice('');
            setDesc('');
            setImg('');
            setCategory('');
        } catch (error) {
             console.log("Submit error:", error);
             // Show error message to user
             alert("Failed to submit data. Please try again.");
        }
    }

  return (
    <div className="flex flex-1 flex-wrap  overflow-auto  border-2 h-screen border-black ">
      {/* Form Data to API*/}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-10 md:py-20 px-10 md:px-20 w-fit">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-black px-4 "
          placeholder="Enter your title"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 border-black px-4 "
          placeholder="Enter your price"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border-2 border-black px-4 "
          placeholder="Enter your desc"
        />
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="border-2 border-black px-4 "
          placeholder="Enter your Image"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-black px-4 "
          placeholder="Enter your category"
        />
        <button className="border-2 border-black px-4">Submit</button>
      </form>

      {/* Display Data from API*/}
      {postdata && (
        <div className="md:py-20 px-20">
          <h1 className='font-bold'>Display data from API result from async</h1>
          <p>Title: {postdata.title}</p>
          <p>Price: {postdata.price}</p>
          <p>Description: {postdata.description || postdata.desc}</p>
          {/* check kedua-dua kemungkinan */}
          <p>Image: {postdata.image || postdata.img}</p>
          {/* check kedua-dua kemungkinan */}
          <p>Category: {postdata.category}</p>
        </div>
      )}

      <div>
        <Image src={asset.post_6} alt="image" className="my-4" />
        <Image src={asset.post_7} alt="image" className="my-4 mx-auto" />
      </div>
    </div>
  );
}

export default Page

"use client";
import { asset } from "@/public/asset";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState(null); //klau data better letak null

   const fetchData = async (url,data) =>{
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); //tukar response HTTP ke objek JavaScript
 
    } catch (error) {
        console.log('error:',error)
        setData({error:error.message})
    }
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const result = await fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`,{name:name.trim()});  //get id from API
        console.log("Success", result);
        setData(result);

        
        alert('Data Berhasil Sila Tekan F12 untuk melihat output');
    } catch (error) {
        console.log('Submit error:', error);
        alert('Failed to submit data. Please try again');
    }
  }

    //  trace setState dgn menggunakan useEffect ..sbb setState selalu async
  useEffect(()=>{
    if(data){
        console.log('Data Retrieved! :,',data)
    }
  })

  return (
    <div className="flex flex-1 flex-col justify-start gap-10 h-screen overflow-auto items-center border-2 border-black">
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-10 px-10 border-2 border-black mt-14">
        <h1>Update User</h1>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-black py-1 rounded-full outline-none ml-6 px-4"
          />
        </div>
        <div>
          <label htmlFor="name">New Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black py-1 rounded-full outline-none px-4 "
          />
        </div>
        <button type="submit" className="border border-black px-1 py-1 rounded-full ">Update User</button>
      </form>

      {data && (
        <div>
          <h2>data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div>
        <Image src={asset.put_1} alt="image" className="my-4" priority={true}/>
        <Image src={asset.put_2}  alt="image" className="my-4" priority={true}/>
      </div>
    </div>
  );
};

export default Page;

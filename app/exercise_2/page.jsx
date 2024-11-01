'use client'
import { asset } from '@/public/asset';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [data,setData] = useState(null);
    const [postId, setPostId] = useState(25);

    const  fetchData = async () => {
        try {
            const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${postId}`);
            const json = await response.json();
            setData((json));
        } catch (error) {
            console.log('error:',error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       if(postId){
         fetchData();
        setPostId('');
       }
    }

    // reload it will display id=25 pikachu...sebab auto fetchdata() using useEffect
    useEffect(()=>{
        fetchData()
        setPostId('');
    },[])

  return (
    <div className="flex flex-col md:justify-start items-center flex-1 h-screen overflow-auto  border-2  border-black py-4 px-4">
      
      <div>
        {/* result */}
        <div className="flex justify-center border-2 border-black min-w-[300px] min-h-[200px] text-center">
          {data && (
            <div className="flex flex-col items-center ">
              <Image
                src={data.sprites.front_default}
                alt="image"
                width={150}
                height={150}
              />
              <h1>Name : {data.name}</h1>
              <div className="flex flex-row gap-3">
                <span className="border-2 border-black px-1 py-1 rounded-lg">
                  {data.types[0].type.name}
                </span>
                {/* Check if second type exists before rendering */}
                {data.types[1] && (
                  <span className="border-2 border-black px-1 py-1 rounded-lg">
                    {data.types[1].type.name}
                  </span>
                )}
                {/* Check if second type exists before rendering */}
                {data.types[2] && (
                  <span className="border-2 border-black px-1 py-1 rounded-lg">
                    {data.types[2].type.name}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        {/* form submit */}
        <form
          onSubmit={handleSubmit}
          className="border-2 border-black py-4 px-4 min-w-[300px]"
        >
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            className="border-2 border-black pl-4"
            placeholder="postId = {objectId}"
          />
          <button className="border-2 border-black">search</button>
        </form>

        {/* table display attribute of result */}
        <div className="overflow-x-auto border-2 border-black min-w-[300px] ">
          <table className=" divide-y-2 divide-gray-200 bg-white md:text-2xl">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  {"Base"}
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  {"Stats"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {"HP:"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {data && data.stats[0].base_stat}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {"Attack:"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {data && data.stats[1].base_stat}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {"Sp. Attack"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {data && data.stats[2].base_stat}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {"Sp. Defense"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {data && data.stats[3].base_stat}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {"Speed"}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {data && data.stats[4].base_stat}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    {/* images */}
      <div>
        <Image src={asset.fetch_4} alt="image" className="object-cover mt-20" />
        <Image src={asset.fetch_5} alt="image" className="object-cover mt-20" />
        <Image src={asset.condition} alt="image" className="object-cover mt-20" />
      </div>
    </div>
  );
}

export default Page

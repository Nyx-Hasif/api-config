'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function Page() {

const [data,setData] = useState(null);

useEffect(()=>{
    const fetchData = async () => {
      try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
          const json = await response.json();
          setData(json);
      } catch (error) {
          console.log("error:", error);
      }

    }
    fetchData();
},[]);

  return (
    <div className='flex flex-1 border-2 border-black'>
      <div className='py-4 px-4'>
        <h1 className='text-2xl font-bold mb-4'>Fetch API using Async/Await</h1>

        <Image src={'/fetch0.png'} alt='image' width={700} height={600} className=''/>
        <div>Result below</div>
        {data ? `${data.title}` : <h1>Loading...</h1>}
      </div>
    </div>
  )
}

export default Page

'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [data,setData] = useState(null);

useEffect(()=>{
fetch("https://jsonplaceholder.typicode.com/todos/1")
.then((response)=>response.json())
.then((json)=>setData(json))
.catch((error)=>console.error('error:',error));
},[]);

  return (
    <div className="flex flex-1 border-2 h-screen border-black ">
      <div className="py-4 px-4 overflow-auto w-full">
        <h1 className="text-2xl font-bold mb-2">Asas Fetch API guna Public URL</h1>
        <div>
          <Image src={'/render0.png'} alt='image' width={600} height={600} className='object-cover md:my-[160px] md:ml-[200px] md:scale-150' />
        </div>
          <div className='mt-4'>
        {data? <h1 className=' border-2 border-black py-2 px-2 inline-flex' >Result = {data.title} </h1>: <h1>Loading...</h1>} 
        <p>Kene guna ternary untuk handling error data..sebab guna async untuk fetch api</p> 
        </div>
        <div className='mt-4'>
            <h1 className='font-bold'>Ini adalah Flow Asynchronous display Data</h1>
            <Image src={'/render1.png'} alt='image' width={600} height={600}/>
            <Image src={'/render2.png'} alt='image' width={600} height={600}/>
        </div> 
      
      </div>
      
    </div>
  );
} 

export default Page

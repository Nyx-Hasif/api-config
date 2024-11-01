'use client'
import Question from '@/components/Question';
import { asset } from '@/public/asset';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [data,setData] = useState(null);
    const [postId, setPostId] = useState("");


          const fetchData = async () => {
            try {
                const url = postId
                  ? `https://jsonplaceholder.typicode.com/posts/${postId}`
                  : "https://jsonplaceholder.typicode.com/todos/1";
                const response = await fetch(url);
                const json = await response.json();
                setData(Array.isArray(json) ? json : [json]);  // Pastikan data sentiasa dalam bentuk array
            } catch (error) {
                console.log('error:',error);
            }
        }

    useEffect(()=>{
        setData('');
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
    if(postId){ //ambil nilai value input letak di condition,klau ad nilai input di value input...baru boleh run fetchdata()
    fetchData();
    setPostId('');//reset input value
    }
}

  return (
    <div className="flex flex-1 flex-col  border-2 h-screen border-black overflow-auto ">
      <Question />
      {/* question 1 */}
      <div className=" flex  flex-col  items-start px-4 py-4 ">
        <div className='border-2 border-black py-2 px-2 mx-auto '>
            <h1>Result :</h1>
            <div className='border-2 border-red-500 py-2 px-2'>{data ? `${data[0].title}` : ''}</div>
            <button onClick={fetchData} className="px-2 py-2 border-2 border-black rounded-lg mt-4 hover:bg-black hover:text-white transition-all duration-500">
            Call All Data API
            </button>
            <Image src={asset.fetch_1} alt='image' className='object-cover md:p-8  '/>
        </div>
     {/* question 2 */}
        <div className='border-2 border-black py-2 px-2 mt-20 mx-auto'>

           <form onSubmit={handleSubmit}>
                <Image src={asset.fetch_2} alt='image'  className='object-cover md:p-8 '/>
                <Image src={asset.fetch_3} alt='image'  className='object-cover md:p-8 '/>
                <input type="number" value={postId} onChange={(e) => setPostId(e.target.value)} className='border-2 border-black mt-4 rounded-lg pl-4 outline-none' placeholder='Enter ID'/>
                <button type='submit'  className="px-2  border-2 border-black rounded-lg mt-4 hover:bg-black hover:text-white transition-all duration-500">
                Search
                </button>
           </form>

              <div className='border-2 border-red-500 py-2 px-2  mt-4 '>
              {data? 
                     data.map((item,index)=>(
                  <div key={index}>
                    <h1>Pos{item.id}: {item.title}</h1>
                    <p>{item.body}</p>  
                </div>
            )): ''}
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default Page

'use client'
import { asset } from '@/public/asset';
import Image from 'next/image';
import React, { useState } from 'react'

const Page = () => {

    const [username, setUsername] = useState('');
    const [job, setJob] = useState('');

    const fetchData = async (url, data) => {
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();

    }

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username && job){
           try {
            const result = await fetchData('https://reqres.in/api/users', {username:username.trim(), job:job.trim()});
            alert('Data Berhasil Sila Tekan F12 untuk melihat output');
            setJob("");
            setUsername("");
            console.log(result);
           } catch (error) {
             console.log("error", error);
           }
        }else{
            alert('Sila isi kedua-dua ruangan');
        }
    }
  return (
    <div className='flex flex-1 h-screen overflow-auto'>
       <div className="flex flex-col gap-4 py-8 px-8">
         <h3 className="text-2xl font-bold">{'https://reqres.in/api/users'}</h3>
         <form onSubmit={handleSubmit}  className="flex md:flex-row flex-col gap-4 py-8 px-8">

            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='border border-black py-2 px-4 outline-none' placeholder='Username'/>
            <input type="text" value={job} onChange={(e) => setJob(e.target.value)} className='border border-black py-2 px-4 outline-none' placeholder='Job'/>
            <button className='border border-black py-2 px-2 rounded-lg'>Submit</button>
         </form>
         <div className='flex flex-wrap gap-5'>
            <Image src={asset.post_3} alt='post-3'/>
            <Image src={asset.post_5} alt='post-4'/>
            <Image src={asset.post_4} alt='post-4'/>
         </div>
       </div>
    </div>
  )
}

export default Page

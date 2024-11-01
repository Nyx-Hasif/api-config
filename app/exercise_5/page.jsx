'use client'
import { asset } from '@/public/asset'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {

    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [message, setMessage] = useState(''); // Tambah ini

    const fetchData = async () => {
        const response = await fetch ('https://jsonplaceholder.typicode.com/posts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // memberitahu server bahawa anda menghantar data dalam format JSON.
            },
            body: JSON.stringify({  //Data yang ingin dihantar. JSON.stringify() menukar objek JavaScript kepada string JSON.
                title: title.trim(), // Menghilangkan spasi di awal dan akhir
                body: body.trim() // Menghilangkan spasi di awal dan akhir
            }),  
        })
        const data = await response.json() //Menukar response body kepada objek JavaScript.
        console.log(data)
    }

    const handleClick = (e) => {
        e.preventDefault();
      if (title && body) {
        fetchData();
        setTitle("");
        setBody("");
        setMessage("Data Berhasil Sila Tekan F12 untuk melihat output");
      } else {
        setMessage("Sila isi kedua-dua ruangan");
      }
    }

  return (
    <form onSubmit={handleClick} className='flex flex-1 flex-col items-start gap-4 h-screen overflow-auto border-2 border-black pl-8 py-4 px-4'>
        <div className='flex flex-row gap-6'>
            <div className='flex gap-4'>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-black'/>
            </div>
            <div className='flex gap-4'>
                <label>Body</label>
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)}className='border-2 border-black'/>
            </div>
        </div>
        <button className='px-2 py-2 border-2 border-black '>Submit</button>
        {message && <p>{message}</p>}
        
        <div className='flex flex-wrap gap-4'>
            <Image src={asset.post_1} alt="image" />
            <Image src={asset.post_2} alt="image" />
            <Image src={asset.post_3} alt="image" />
        </div>
    </form>
  )
}

export default Page

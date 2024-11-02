'use client'
import { asset } from '@/public/asset'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {

    // management of state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const fetchData = async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const result = await fetchData('https://reqres.in/api/register', {email, password});
        
            // Jika success
            if (result.token ) {  
                alert('Registration successful!');
                console.log(result);
                setEmail('');
                setPassword('');
            }else{
                alert(result.error);
                console.log(result.error)
                }
        }
        
         catch (error) {
            // Jika error dari API
            if (error.response) {
                alert(error.response.error || 'Registration failed');
            } else {
                alert('Something went wrong');
            }
        }
      
    }

  return (
    <div className='flex flex-1 flex-col gap-20  justify-start items-center h-screen overflow-auto'>
        {/* parent */}
      <div className=' flex flex-col  gap-4 border-2 border-black max-w-[500px] mt-10 '>
            <div>
                <Image draggable={false} src={asset.loginPage} alt={'login'}  className='object-cover w-[300px] h-[300px] md:w-[500px] md:h-[400px]' priority={true}/>
            </div>
            {/* register text */}
             <div className='text-center'>
                <h1>Register Successful = eve.holt@reqres.in</h1>
                <p>password = pistol</p>
                <h1>Register unsuccessful = sydney@fife</h1>
                <p>password = null</p>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 py-8 px-4'>
                <div className='flex flex-row gap-11 h-fit'>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border border-black outline-none px-4' placeholder='Enter your email'/>
                </div>
                <div className='flex flex-row gap-4 h-fit'>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border border-black outline-none px-4' placeholder='Enter your password'/>
                </div>
                <button className=' bg-black text-white h-[40px] mt-10'>Register</button>
            </form>
      </div>
        <div>
            <Image src={asset.register} alt={'register'}  className='object-cover ' priority={true}/>
        </div>
    </div>
  )
}

export default Page

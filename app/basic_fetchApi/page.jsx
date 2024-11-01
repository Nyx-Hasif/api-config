import Image from 'next/image';
import React from 'react'

const page = () => {

const myPromise = new Promise((resolve,reject) => {
  setTimeout(()=>{
    resolve("Data telah diterima");
  },2000);
})

myPromise.then((data)=>{
  console.log(data);
})

const getData = async () => {
  const data = await myPromise; //variable lokal
  console.log(data);
  return data; //result dari promise after 2s
}

  return (
    <div className='flex flex-1 border-2 border-black'>
      <div className='flex flex-col gap-4 pl-6 pt-4'>
        <h1 className='text-2xl font-medium'>BASIC FETCH API DATA GUNA NEW PROMISE,ASYNC DAN AWAIT </h1>
        <Image src={'/new-promise.png'} alt="image" width={600} height={600}/>
         <h1>Dibawah ini adalah Result promise yang dipanggil secara asynchronous bila call getData();</h1>
         <p>page will load 2seconds..after load it will render the page</p>
        <div className='pl-4 border-2 border-black text-center py-2 px-2'>{getData()}</div>
      </div>
    </div>
  )
}

export default page

import { asset } from '@/public/asset'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-1 justify-center h-screen overflow-auto   border-2 border-black">
      <div className="px-4 py-4">
        <Image src={asset.concept} alt="image" className="my-4" />
        <Image src={asset.restful} alt="image" className="my-4" />
      </div>
    </div>
  );
}

export default page

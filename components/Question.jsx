import React from 'react'

const Question = () => {
  return (
    <div className="flex border-2 border-black">
      <div className="px-4 py-4">
        <h1>Exercise 1</h1>
        <ol className="pl-4 pt-4">
          <li className="list-decimal">
            {` Cuba ubah URL API kepada
            'https://jsonplaceholder.typicode.com/posts' dan paparkan senarai
            post.`}
          </li>
          <li className="list-decimal">
            {`Tambah butang untuk memuat semula data.`}
          </li>
          <li className="list-decimal">
            {`Tambah input untuk membolehkan pengguna mencari post berdasarkan ID.`}
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Question

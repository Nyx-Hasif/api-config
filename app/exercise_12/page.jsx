"use client";
import React from "react";

const page = () => {

        const codeString = `"use client";
            import React from "react";

            const page = () => {
            const deleteData = async (url) => {
                const response = await fetch(url, {
                method: "DELETE",
                });
                return response.json();
            };

            const handleDelete = async () => {
                try {
                const result = await deleteData("https://fakestoreapi.com/products/6");
                console.log("Success:", result);
                alert("Data Berhasil Sila Tekan F12 untuk melihat output");
                // Cuba dapatkan produk selepas delete
                const checkProduct = await fetch("https://fakestoreapi.com/products/6");
                const productData = await checkProduct.json();
                console.log("Product after delete attempt:", productData);
                } catch (error) {
                console.log("error:", error);
                }
            };

            return (
                <div className="flex flex-1 border-2 border-black px-4 py-4 ">
                <div>
                    <button
                    type="button"
                    onClick={handleDelete}
                    className="py-2 px-2 border border-black rounded"
                    >
                    Delete
                    </button>
                </div>
                </div>
            );
            };

            export default page;
            `;

  const deleteData = async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const handleDelete = async () => {
    try {
      const result = await deleteData("https://fakestoreapi.com/products/6");
      console.log("Success:", result);
      alert("Data Berhasil Sila Tekan F12 untuk melihat output");
      // Cuba dapatkan produk selepas delete
      const checkProduct = await fetch("https://fakestoreapi.com/products/6");
      const productData = await checkProduct.json();
      console.log("Product after delete attempt:", productData);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-screen overflow-auto gap-4 border-2 border-black px-4 py-4 ">
      <div>
        <button
          type="button"
          onClick={handleDelete}
          className="py-2 px-2 border border-black rounded"
        >
          Delete
        </button>
      </div>
      <div>
        <pre><code>{codeString}</code></pre>
      </div>
    </div>
  );
};

export default page;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router'
import { add } from '../redux/reducer/cartSlice';
import { toast } from 'react-toastify';

// const productsData=[
//   {
//     id: 1,
//     product: "Mobile two",
//     desc: "Just add your desired image size (width & height) after our URL, and you'll get a random image.",
//     imgUrl: "https://picsum.photos/200/300"
//   },
//   {
//     id: 2,
//     product: "Jewelary",
//     desc: "Just add your desired image size (width & height) after our URL, and you'll get a random image.",
//     imgUrl: "https://picsum.photos/300/300"
//   },
//   {
//     id: 3,
//     product: "laptop",
//     desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', ",
//     imgUrl: "https://picsum.photos/200/300"
//   },
//   {
//     id: 4,
//     product: "laptop",
//     desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
//     imgUrl: "https://picsum.photos/200/300"
//   },
//   {
//     id: 5,
//     product: "laptop",
//     desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
//     imgUrl: "https://picsum.photos/200/300"
//   },
//   {
//     id: 6,
//     product: "laptop",
//     desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of usin",
//     imgUrl: "https://picsum.photos/200/300"
//   },
//   {
//     id: 7,
//     product: "lapto",
//     desc: "Cheap Laptop in lowest price",
//     imgUrl: "https://picsum.photos/200/300"
//   }
// ]

function Home() {
  const [productsData, setProductData]=useState([]);
 const dispatch= useDispatch()

  useEffect(()=>{
    async function getAPI(){
      try {
      const response=  await axios.get(import.meta.env.VITE_SERVER_URL)
      // console.log(response.data);
      setProductData(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getAPI();
  },[productsData])

  const handleAdd=(data)=>{
    dispatch(add(data))
    toast.success("Your product added suuccessfully");
  }

  return (
    <>
        {/* header */}
        <div className="bg-blue-50">
        <div className="w-11/12 mx-auto text-red-950 py-5 flex justify-between items-center">
          <h1 className="text-center text-blue-950 my-2 text-xl">
            CRUD Operation
          </h1>
          <div>
            <Link to="create">
              <button className="bg-red-950 text-white px-2 py-1">
                Add Product
              </button>
            </Link>
          </div>
        </div>
      </div>
          {/* body */}
          <div className="w-11/12 mx-auto">
        <h2 className="text-center text-2xl py-5 font-bold">All Products</h2>
        <div className="my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
            {productsData.map((item, i) => (
              <div
                key={i}
                className="bg-[#eee] p-5 flex flex-col  items-center justify-center"
              >
                <h2 className=" text-center text-blue-950 text-xl py-2">
                  {item.productName}
                </h2>

                <p className="text-lg pb-2">{item.desc}</p>
                <div className="mx-auto flex gap-x-5">
                  <Link to={`/product/${item.id}`}>
                    <button className="bg-red-950 text-white px-2 py-1">
                      Show All Detail
                    </button>
                  </Link>

                  <button
                    onClick={() => handleAdd(item)}
                    className="bg-red-950 text-white px-2 py-1"
                    
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
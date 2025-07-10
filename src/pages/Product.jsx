import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { add } from '../redux/reducer/cartSlice';
import { useDispatch } from 'react-redux';

function Product() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct]=useState({});
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const handleUpdate = () => {
    localStorage.setItem("id",singleProduct.id);
    localStorage.setItem("productName",singleProduct.productName);
    localStorage.setItem("desc",singleProduct.desc);
    localStorage.setItem("imgUrl",singleProduct.imgUrl);
    navigate("/update");
  };

  useEffect(() => {
    async function getSingleProduct() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/${id}`)

        // console.log(response.data);
        setSingleProduct(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getSingleProduct()
  }, [])

  async function handleDelete(){
    try {
    await  axios.delete(`${import.meta.env.VITE_SERVER_URL}/${id}`);
    toast.success("You have successfully deleted Product");
    navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  const handleAdd=(data)=>{
    dispatch(add(data))
    toast.success("Your product added suuccessfully");
  }


  return (
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between py-10">
        <h2>Single Product</h2>
        <div className="flex gap-x-5">
          <button
            onClick={handleUpdate}
            className="bg-red-950 text-white px-2 py-1"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-950 text-white px-2 py-1"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="">
        <div className="p-5 flex flex-col  items-center justify-center">
          <h2 className=" text-center text-blue-950 text-xl py-2">
           {singleProduct?.productName}
          </h2>

          <p className="text-lg pb-2">{singleProduct?.desc}</p>
          <img src={singleProduct?.imgUrl} alt="product" className="" />

          <div className="flex gap-x-10">
            <button

              onClick={() => handleAdd(singleProduct)}
              className="bg-red-950 text-white px-2 py-1 my-5"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-950 text-white px-2 py-1 my-5"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
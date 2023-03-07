import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Table = () => {

    const [ProductId, setProductId] = useState('')
    const [ProductTitle, setProductTitle] = useState('')
    const [ProductDescription, setProductDescription] = useState('')
    const [ProductPrice, setProductPrice] = useState('')
    const [Quantity, setQuantity] = useState()
    const [productDetails, setProductDetails] = React.useState([])
    const [id,setId] = useState()
    const [del,setDel] = useState(false)

    const [modal, setModal] = React.useState(false)
    const [UpdateModal, setUpdateModal] = React.useState(false)


    useEffect(() => {
        axios.get(`http://localhost:5000/getAll_products`).then((res) => {
            console.log(res.data.getAllProducts)
            setProductDetails(res.data.getAllProducts)
        })
    }, [modal,UpdateModal,del])


  




    const formUpdate = (data) => {
        console.log("....", data)
    }




    const openAddProductModal = () => {
        setModal(true)
    }

    const formData = new FormData()

    const addProduct = () => {
        const details = {

            Product_Code: ProductId,
            Product_title: ProductTitle,
            description: ProductDescription,
            quantity: Quantity,
            price: ProductPrice


        }
        try {
            axios.post(`http://localhost:5000/create_product`,details).then((res)=>{
                if(res) alert('success')
        setModal(false)

            })
        } catch (error) {
            
        }

    }

    const openUpdateModal = (res) => {
        setUpdateModal(true)
        formUpdate(res)
        setProductId(res.Product_Code)
        setProductDescription(res.description)
        setProductTitle(res.Product_title)
        setQuantity(res.quantity)
        setProductPrice(res.price)
        setId(parseInt(res.id))
        // console.log(res)

    }

    const updateProduct = () => {
        // setUpdateModal(false)

        const details = {

            Product_Code: ProductId,
            Product_title: ProductTitle,
            description: ProductDescription,
            quantity: Quantity,
            price: ProductPrice


        }
        console.log(details)
        try {
            axios.put(`http://localhost:5000/update_product/${id}`, details).then((res) => {
                if (res) setUpdateModal(false)
            }).catch(err => console.log(err))
        } catch (error) {

        }
    }

    const deleteProduct =(id)=>{
        try {
            axios.delete(`http://localhost:5000/delete_product/${id}`).then((res)=>{

                if(res) alert('success')
                setDel(!del)

            })
        } catch (error) {
            
        }
    }


    return (
        <div className={`bg-slate-200 h-screen overflow-hidden `}>

            <div className='w-full h-20'>

            </div>
            <div className='w-full flex justify-center px-10 shadow shadow-md bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 py-5'>
                <div className='container flex justify-start'>
                    <button onClick={() => openAddProductModal()} className='bg-stone-100 px-3 text-sm py-1 rounded-lg ring-teal-500 hover:bg-teal-600 hover:ring-1 ring-1 text-teal-700 hover:text-white shadow hover:font-semibold'>


                        Add New Product

                    </button>
                </div>
            </div>



            <div class="relative overflow-x-auto h-[100vh] z-10">
                <table class="container mx-auto border rounded-xl shadow shadow-lg shadow-stone-700 overflow-hidden  mt-10 text-sm text-left text-gray-100 dark:text-gray-900">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-100 dark:text-gray-400 border-b border-stone-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                description
                            </th>
                            <th scope="col" class="px-6 w-60 py-3">
                                quantity
                            </th>
                            <th scope="col" class="px-6 w-60 py-3">
                                price
                            </th>
                            <th scope="col" class="px-6 w-60 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productDetails.map((res) => {
                                return (
                                    <tr class="bg-white border-b hover:bg-stone-200  duration-200 border-black">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                            {res.Product_Code}
                                        </th>
                                        <td class="px-6 py-4">
                                            {res.Product_title}
                                        </td>
                                        <td class="px-6 py-4">
                                            {res.description}
                                        </td>
                                        <td class="px-6 py-4">
                                            {res.quantity}
                                        </td>
                                        <td class="px-6 py-4">
                                            {res.price} /-
                                        </td>
                                        <td class="px-6 flex gap-2 w-60 py-4">
                                            <button onClick={() => openUpdateModal(res)} className='bg-blue-400 w-20 h-6 rounded-lg text-white hover:bg-blue-600'>Update</button>
                                            <button onClick={()=>deleteProduct(res.id)} className='bg-red-400 w-20 h-6 rounded-lg text-white hover:bg-red-600'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {
                    modal ? <>
                        <motion.div initial={{ y: 1000 }} animate={{ y: -350, transition: { duration: 1 } }} className='w-[30vw] shadow shadow-xl py-8 shadow-stone-600 mx-auto p-10 z-10 bg-stone-300 rounded-xl'>
                            <div className=' h-full grid grid-cols-1 gap-1 mx-auto '>
                                <input  onChange={(e) => setProductId(e.target.value)} type="text "  className='border   m-2 rounded-xl h-8 px-3 py-2 text-sm' placeholder='Enter Product Code ...' name="" id="" />
                                <input   onChange={(e) => setProductTitle(e.target.value)} type="text " className='border   m-2 rounded-xl h-8 px-3 py-2 text-sm' placeholder='Enter Product Title ...' name="" id="" />
                                <textarea   onChange={(e) => setProductDescription(e.target.value)} type="text " className='border  m-2 rounded-xl h-20 px-3 py-2 text-sm' placeholder='Enter Product Description ...' name="" id="" />
                                <input  onChange={(e) => setQuantity(e.target.value)} type="text" className='border  m-2 rounded-xl h-8 px-3 py-2 text-sm' placeholder='Enter Product Quantity ...' name="" id="" />
                                <input   onChange={(e) => setProductPrice(e.target.value)} type="text " className='border  m-2 rounded-xl h-8 px-3 py-2 text-sm' placeholder='Enter Product Price ...' name="" id="" />
                                {/* <input type="text " className='w-60 border  m-2 rounded-xl h-8 px-3 text-sm' placeholder='Enter Product Name ...' name="" id="" /> */}


                            </div>
                            <div><button onClick={() => addProduct()} className='bg-teal-500 py-1 hover:bg-teal-600 w-20 m-4 rounded-xl text-sm'>Add</button></div>
                        </motion.div>

                    </> : null
                }


                {
                    UpdateModal ? <>
                        <motion.div initial={{ y: 1000 }} animate={{ y: -350, transition: { duration: 1 } }} className='w-[30vw] shadow shadow-xl py-8 shadow-stone-600 mx-auto p-10 z-10 bg-blue-200 rounded-xl'>
                            <div className=' h-full grid grid-cols-1 gap-1 mx-auto '>


                                <input type="text " onChange={(e) => setProductId(e.target.value)} className='border   m-2 rounded-xl h-8 px-3 py-2 text-sm placeholder-slate-600' placeholder={ProductId} name="" id="" />
                                <input type="text " onChange={(e) => setProductTitle(e.target.value)} className='border   m-2 rounded-xl h-8 px-3 py-2 text-sm placeholder-slate-600' placeholder={ProductTitle} name="" id="" />
                                <textarea type="text " onChange={(e) => setProductDescription(e.target.value)} className='placeholder-slate-600 border  m-2 rounded-xl h-20 px-3 py-2 text-sm' placeholder={ProductDescription} name="" id="" />
                                <input type="text " onChange={(e) => setQuantity(e.target.value)} className='placeholder-slate-600 border  m-2 rounded-xl h-8 px-3 py-2 text-sm' placeholder={Quantity} name="" id="" />
                                <input type="text " onChange={(e) => setProductPrice(e.target.value)} className='placeholder-slate-600 border  m-2 rounded-xl h-8 px-3 py-2 text-sm' placeholder={ProductPrice} name="" id="" />
                                {/* <input type="text " className='w-60 border  m-2 rounded-xl h-8 px-3 text-sm' placeholder='Enter Product Name ...' name="" id="" /> */}



                            </div>
                            <div><button onClick={() => updateProduct()} className='bg-teal-500 py-1 text-white hover:bg-teal-600 w-20 m-4 rounded-xl text-sm'>Update</button></div>
                        </motion.div>

                    </> : null
                }
            </div>




        </div>


    )
}




export default Table
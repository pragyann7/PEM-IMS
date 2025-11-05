import { PackagePlus, Image as ImageIcon, X, ImageUp } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axiosInstance from "../API/axiosInstance"

const AddProducts = () => {
    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        stock: '',
        brand: '',
        purchase_price: '',
        selling_price: '',
        image: null,
    })

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosInstance.get('/categories');
                setCategories(res.data)
                console.log(res.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('stock', product.stock);
        formData.append('brand', product.brand);
        formData.append('purchase_price', product.purchase_price);
        formData.append('selling_price', product.selling_price);
        formData.append('image', product.image);

        if (!product.name || !product.selling_price || !product.category) {
            alert("Please fill all required fields");
            return;
        }


        try {
            const res = await axiosInstance.post('/addproduct/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("data insertion successfull")
            console.log("data insertion successfull")
            setProduct({
                name: '',
                description: '',
                category: '',
                stock: '',
                brand: '',
                purchase_price: '',
                selling_price: '',
                image: null,
            })
            setPreview(null)

        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value, });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setProduct({ ...product, image: file });
        }
    }

    const removeImage = () => {
        setPreview(null);
        setProduct({ ...product, image: null });
    }
    return (
        <div>
            <div className='flex items-center'>
                <PackagePlus size={55} />
                <label className='font-semibold text-4xl ml-2'>Add New Product</label>
            </div>

            {/* For product info */}
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between gap-3 mt-4'>
                    <div className='bg-gray-200 rounded-2xl w-full p-4 space-y-4'>
                        <div className='flex flex-col'>
                            <label className='text-[22px]'>Product Name</label>
                            <input type="text" name='name' onChange={handleChange} value={product.name} className="w-full bg-gray-100 text-[17px] border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-[22px]'>Description</label>
                            <textarea name='description' onChange={handleChange} value={product.description} className='w-full bg-gray-100 text-[17px] border border-gray-300 text-gray-800 rounded-lg px-4 pb-14 pt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-[22px]'>Category</label>
                            <select name="category" onChange={handleChange} value={product.category} className='py-4 px-2 border text-[17px] border-gray-300 bg-gray-100 rounded-xl'>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex flex-col'>
                                <label className='text-[22px]'>Stock</label>
                                <input type="number" name='stock' onChange={handleChange} value={product.stock} className='w-full text-[17px] bg-gray-100 border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-[22px]'>Brand</label>
                                <input type="text" name='brand' onChange={handleChange} value={product.brand} className='w-full text-[17px] bg-gray-100 border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex flex-col'>
                                <label className='text-[22px]'>Purchase Price</label>
                                <input type="number" name='purchase_price' onChange={handleChange} value={product.purchase_price} className='w-full text-[17px] bg-gray-100 border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-[22px]'>Selling Price</label>
                                <input type="number" name='selling_price' onChange={handleChange} value={product.selling_price} className='w-full text-[17px] bg-gray-100 border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            </div>
                        </div>
                    </div>

                    {/* For image */}
                    <div className="bg-gray-200 rounded-2xl w-full h-105 p-4">
                        <div className="flex flex-col">
                            <label className="text-[22px] font-medium mb-2">Upload Image</label>

                            <div
                                className={`relative border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition ${preview ? "border-none" : "border-gray-400 hover:border-blue-400"} w-full h-84 bg-gray-100 overflow-hidden`}
                            >
                                {preview ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={removeImage}
                                            className="absolute top-2 z-10 right-2 bg-white cursor-pointer rounded-full p-1 shadow hover:bg-gray-100"
                                        >
                                            <X size={16} className="text-red-600" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex flex-col items-center'>
                                        <ImageUp className="text-gray-400 mb-2" size={40} />
                                        <p className="text-gray-500 text-sm">Click to upload image</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* For Action buttons */}
                <div className='flex justify-around mt-9 space-x-4'>
                    <button className='border font-semibold text-gray-900 w-full py-3 rounded-4xl cursor-pointer'>Save as draft</button>
                    <button type='submit' className='bg-blue-500 font-semibold text-white w-full py-3 rounded-4xl cursor-pointer'>Add product</button>
                </div>
            </form>
        </div>
    )
}

export default AddProducts

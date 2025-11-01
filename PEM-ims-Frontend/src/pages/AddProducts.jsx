import { PackagePlus, Image as ImageIcon, X, ImageUp } from 'lucide-react'
import React, { useState } from 'react'

const AddProducts = () => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    const removeImage = () => {
        setPreview(null);
    }
    return (
        <div>
            <div className='flex items-center'>
                <PackagePlus size={55} />
                <label className='font-semibold text-4xl ml-2'>Add New Product</label>
            </div>

            {/* For product info */}
            <div className='flex justify-between gap-3 mt-4'>
                <div className='bg-gray-200 rounded-2xl w-full p-4 space-y-4'>
                    <div className='flex flex-col'>
                        <label className='text-[22px]'>Product Name</label>
                        <input type="text" className="w-full bg-gray-100 text-[17px] border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[22px]'>Description</label>
                        <textarea className='w-full bg-gray-100 text-[17px] border border-gray-300 text-gray-800 rounded-lg px-4 pb-14 pt-2 focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[22px]'>Category</label>
                        <select className='py-4 px-2 border text-[17px] border-gray-300 bg-gray-100 rounded-xl'>
                            <option value="">Select category</option>
                            <option value="">Bulb</option>
                            <option value="">Home Appliance</option>
                        </select>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex flex-col'>
                            <label className='text-[22px]'>Stock</label>
                            <input type="number" className='w-full text-[17px] bg-gray-100 border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-[22px]'>Price</label>
                            <input type="number" className='w-full text-[17px] bg-gray-100 border border-gray-300 text-gray-800 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
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
                <button className='bg-blue-500 font-semibold text-white w-full py-3 rounded-4xl cursor-pointer'>Add product</button>
            </div>
        </div>
    )
}

export default AddProducts

import React, { useState, useEffect } from 'react'
import axiosInstance from '../API/axiosInstance';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axiosInstance.get('/products');
                setProducts(res.data);
                console.log('fetch success.')
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);
    return (
        <div className="bg-gray-50">
            <div className="flex justify-between bg-gray-900 text-white font-semibold py-3 px-4 rounded-t-lg sticky top-0 z-10">
                <div className="w-1/6 text-center">Image</div>
                <div className="w-1/7 text-center">Name</div>
                <div className="w-1/6 text-center">Category</div>
                <div className="w-1/6 text-center">Brand</div>
                <div className="w-1/9 text-center">Stock</div>
                <div className="w-1/7 text-center">Purchase</div>
                <div className="w-1/7 text-center">Selling</div>
            </div>

            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-300 rounded-b-lg bg-white shadow-sm">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="flex justify-between items-center py-3 px-4 border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
                    >
                        <div className="w-1/6">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-37 h-32 object-cover rounded-lg"
                            />
                        </div>
                        <div className="w-1/7 text-center font-medium">{p.name}</div>
                        <div className="w-1/6 text-center">{p.category}</div>
                        <div className="w-1/6 text-center">{p.brand}</div>
                        <div className="w-1/9 text-center">{p.stock}</div>
                        <div className="w-1/7 text-center text-green-700 font-semibold">
                            Rs. {p.purchase_price}
                        </div>
                        <div className="w-1/7 text-center text-green-700 font-semibold">
                            Rs. {p.selling_price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products

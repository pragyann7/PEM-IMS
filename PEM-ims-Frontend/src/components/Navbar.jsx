import { BadgeQuestionMark, Bell, CircleUser, CopyPlus, Search, Settings, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center h-13 bg-gray-900 text-white'>
            <div className='flex items-center justify-between px-5 w-full'>
                <div className=''>
                    <input type="search" className='bg-white rounded-2xl w-67 text-[12px] text-black pl-3 p-1' placeholder='Search here' />
                </div>
                <div className='flex items-center'>
                    <NavLink to="/addproducts">
                        <CopyPlus className='cursor-pointer' />
                    </NavLink>
                    <Bell size={22} className='ml-3 cursor-pointer' />
                    <Settings size={22} className='ml-2 cursor-pointer' />
                    <BadgeQuestionMark size={20} className='ml-2 cursor-pointer' />
                    <CircleUser className='ml-2 mr-1 cursor-pointer' />
                    <label>Admin</label>
                </div>
            </div>
        </div>
    )
}

export default Navbar

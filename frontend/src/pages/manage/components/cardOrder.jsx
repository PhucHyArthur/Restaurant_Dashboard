import React from 'react'   
import { FaCartShopping } from 'react-icons/fa6'

const CardOrder = () => {
  return (
    <div className='w-full p-5 border-[1px] border-gray-400 rounded-md'>
        <p>Title</p>
        <div className='flex items-center'>
            <div>
                <FaCartShopping/>
            </div>
            <h1>
                123
            </h1>
        </div>
        
    </div>
  )
}

export default CardOrder
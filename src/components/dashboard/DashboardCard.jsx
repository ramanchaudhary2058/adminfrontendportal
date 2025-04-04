import React from 'react'

import { BUY_ROUTE } from '../../constants/route'
import { Link } from 'react-router-dom'


const DashboardCard = ({title,url,price,schedule}) => {

  return (
   
    <div className=" text-black  rounded-2xl shadow-lg w-full px-4 py-4 ">
 
 {url ? (
          <img
            src={url}
            alt="Course"
            className="w-full h-40 object-cover rounded-md"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
            No Image
          </div>
        )}
  
     <div className='ml-4 mt-2'>
     <h2 className="text-xl font-bold mb-2 uppercase">{title}</h2>
     <p className="text-gray-600">📅 {new Date(schedule).toLocaleString()}</p>

      <p className="font-semibold text-lg">Price: ${price}</p>
      <Link to='https://sipalaya.com/courses/'>
      <button className="mt-3 bg-sky-300 py-2 px-4 rounded-md font-semibold hover:bg-gray-200 transition-all">
        Syllabus
      </button>
      </Link>
     
   <Link to={BUY_ROUTE}>
   <button className="mt-3 bg-sky-700 ml-4  px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-all">
        Purchase
      </button></Link>
     </div>
    </div>
  )
}

export default DashboardCard

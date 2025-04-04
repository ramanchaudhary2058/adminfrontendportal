import axios from "axios"
import config from "../config/config"
const authToken =localStorage.getItem("authToken")
const getCourseVideo=async()=>{
  const response= await axios.get(`${config.BaseApiUrl}/api/classes`)
 
  return response
}
const addCourseVideo=async(data)=>{
  const response= await axios.post(`${config.BaseApiUrl}/api/add-class`,data)

  return response
}
const addCourses=async(data)=>{
  const response= await axios.post(`${config.BaseApiUrl}/api/courses`,data,{
    headers:{ 
          Authorization: `Bearer ${authToken}`
        
      
     }
  })

  return response
}
const getAllCourses=async({limit=10,sort=JSON.stringify({createdAt:-1}),filters={}})=>{
    const query=`limit=${limit}&sort=${sort}&filters=${JSON.stringify(filters)}`
  const response= await axios.get(`${config.BaseApiUrl}/api/courses?${query}`)

  return response
}
const updateCourses=async(id,data)=>{
  const response= await axios.put(`${config.BaseApiUrl}/api/courses/${id}`,data,{
    headers:{ 
          Authorization: `Bearer ${authToken}`
        
      
     }
  })

  return response
}
const deleteCourses=async(id)=>{
  const response= await axios.delete(`${config.BaseApiUrl}/api/courses/${id}`,{
    headers:{ 
          Authorization: `Bearer ${authToken}`
        
      
     }
  } )

  return response
}

const getTotalCourses=async()=>{
  const response= await axios.get(`${config.BaseApiUrl}/api/courses/total` )

  return response
}

export {getCourseVideo,addCourseVideo,addCourses,getAllCourses,deleteCourses,updateCourses,getTotalCourses}
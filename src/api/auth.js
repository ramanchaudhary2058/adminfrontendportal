import axios from "axios"
import config from "../config/config"
const authToken=localStorage.getItem("authToken")
const login=async({phone,password})=>{
   
const response=await axios.post(`${config.BaseApiUrl}/api/auth/login`,{phone,password})
// console.log(response)
return response;
}
const fetchRegister=async({name,phone,batch,email,password,confirmPassword})=>{
    const response=await axios.post(`${config.BaseApiUrl}/api/auth/register`,{name,phone,batch,email,password,confirmPassword})
    return response;
    }

    const uploadProfileImage=async(formdata)=>{
      
      const response=await axios.put(`${config.BaseApiUrl}/api/auth/upload`,formdata,
        {
            headers:{ 
                  Authorization: `Bearer ${authToken}`,
                "Content-Type": "multipart/form-data"
                
              
             }
          }
          );
          return response
    }


    // const getUserById=async ()=>{
    //  const response= await axios.get(`${config.BaseApiUrl}/api/auth/user`,
    //   {
    //     headers:{
    //       Authorization:`Bearer ${authToken}`
    //     }
    //   }
    //  )
   
    //  return response
  
    // }
    const getUserById=async (id)=>{
      const response= await axios.get(`${config.BaseApiUrl}/api/auth/user/${id}`,
       {
         headers:{
           Authorization:`Bearer ${authToken}`
         }
       }
      )
    
      return response
   
     }
    const getAllUsers=async ({limit=10,sort=JSON.stringify({createdAt:-1}),filters={}})=>{
      const query=`limit=${limit}&sort=${sort}&filters=${JSON.stringify(filters)}`
      const response= await axios.get(`${config.BaseApiUrl}/api/auth/users?${query}`,
       {
         headers:{
           Authorization:`Bearer ${authToken}`
         }
       }
      )
   
      return response
   
      
     }
     const getBatches=async ()=>{
   
      const response= await axios.get(`${config.BaseApiUrl}/api/auth/batches`)
       
      return response
   
      
     }
     const editUser=async (id,data)=>{
    
      const response= await axios.put(`${config.BaseApiUrl}/api/auth/${id}`,data,
       {
         headers:{
           Authorization:`Bearer ${authToken}`
         }
       }
      )
    
      return response
   
     }
     const deleteUser=async (id)=>{
    
      const response= await axios.delete(`${config.BaseApiUrl}/api/auth/${id}`,
       {
         headers:{
           Authorization:`Bearer ${authToken}`
         }
       }
      )
    
      return response
   
     }
     const getUsersTotal=async ()=>{
      const response= await axios.get(`${config.BaseApiUrl}/api/auth/total`)
    
      return response
   
     }
export {login,fetchRegister,getUsersTotal,uploadProfileImage,getUserById,getAllUsers,editUser,deleteUser,getBatches}
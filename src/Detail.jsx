// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// const Detail = () => {
//     const {id} = useParams();
//     const [fdata , fsetData] = useState([]);
//     const fetch = () => {

//         axios.get(`http://localhost:4000/posts/${id}`).then((res)=>{
//             fsetData(res.data)
//         }).catch((e)=>console.log("page Error",e));
//     }
//     console.log(fdata);
//     useEffect(()=>{
//         fetch()
//     },[])
//   return (
//     <div>
//         <h3>Data</h3>
//         <h3>{fdata.id}</h3>
//         <h3>{fdata.productName}</h3> 
//         <h3>{fdata.desc}</h3>  
//     </div>
//   )
// }

// export default Detail

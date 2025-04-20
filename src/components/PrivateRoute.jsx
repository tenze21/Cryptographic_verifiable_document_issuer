import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute= ()=>{
    const marksheet= useSelector((state)=>state.marksheet.data);

    return marksheet? <Outlet/> : <Navigate to='/' replace/>
}
export default PrivateRoute;
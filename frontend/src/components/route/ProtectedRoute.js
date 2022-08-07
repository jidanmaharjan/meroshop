import { useSelector } from 'react-redux'
import {  Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({isAdmin}) => {
    const { isAuthenticated,loading, user } = useSelector(state => state.auth)

    if(!loading && isAuthenticated === false ){
        return <Navigate to='/login' />
    }
    if(!loading &&  isAdmin === true && user.role === 'user'){
        return <Navigate to='/'/>
    }
    if(!loading &&  isAuthenticated === true){
        return <Outlet/>
    }
}
 
export default ProtectedRoute;
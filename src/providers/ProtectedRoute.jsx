
import { getToken } from './CookieHandler'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const token = getToken();
  if(!token){
    return <Navigate to ='/login'/>;
  }

  return children;
}

export default ProtectedRoute
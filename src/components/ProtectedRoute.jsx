import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user && user.agentId ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

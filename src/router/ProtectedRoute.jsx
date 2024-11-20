import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const flexiUser = JSON.parse(localStorage.getItem('flexi_user'));
  
  if (!flexiUser || !allowedRoles.includes(flexiUser.role)) {
    // Redirect to dashboard or home if user is not authorized
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute; 
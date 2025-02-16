import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[]; // Kimler erişebilir?
  userRole: string; // Kullanıcının rolü
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles, userRole }) => {
  if (!allowedRoles.includes(userRole)) {
    toast.error("Bu sayfaya erişim yetkiniz yok!", {
      position: "top-right",
      autoClose: 3000, // 3 saniye sonra kapanır
    });

    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;

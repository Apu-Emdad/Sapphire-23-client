import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const location = useLocation();

  return (
    <Route
      {...rest}
      element={
        isAuth ? (
          children
        ) : (
          <Navigate to="/" replace state={{ from: location }} />
        )
      }
    />
  );
};

export default PrivateRoute;

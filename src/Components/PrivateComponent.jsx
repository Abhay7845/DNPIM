import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  console.log("signOUt==>", localStorage.getItem("store_code"));

  return (
    <>
      {localStorage.getItem("store_code") ? (
        <Outlet />
      ) : (
        <Navigate to="/DNpimPortal" />
      )}
    </>
  );
};

export default PrivateComponent;

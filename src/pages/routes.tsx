import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import FormCreator from "./FomrCreator/Creator";
import { useToken } from "../hooks/auth/useToken";
import AuthTab from "./Authentication/AuthTab";

const Router = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <AuthTab setToken={setToken} />;
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/form-creator' element={<FormCreator />} />
    </Routes>
  );
};

export default Router;

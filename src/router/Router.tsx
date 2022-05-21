import { Route, Routes } from "react-router-dom";
import { Household } from "../components/pages/Household";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";

export const Router = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={<Login />} />
      <Route
        path="/household"
        element={<Household />} />
      <Route 
        path="*"
        element={<Page404 />} />
    </Routes>
  );
};
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BaseCafes from "./components/Cafes";
import BaseEmployees from "./components/Employees";
import PageNotFound from "./components/PageNotFound";

import withMainLayout from "./components/Layouts/Main";
import { ROUTES } from "./utils/constant";

const withLayout = withMainLayout();

const Cafes = withLayout(BaseCafes);
const Employees = withLayout(BaseEmployees);
const PageNotFoundRoute = withLayout(PageNotFound);

const BaseRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Employees />} path={`${ROUTES.EMPLOYEES}/:cafeId`} />
        <Route element={<Employees />} path={ROUTES.EMPLOYEES} />
        <Route element={<Cafes />} path={ROUTES.CAFES} />
        <Route element={<PageNotFoundRoute />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRoute;

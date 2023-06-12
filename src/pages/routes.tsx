import { RouteObject, useRoutes } from "react-router";
import Home from "./home";
import { FC } from "react";

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <Home />,
  },
];

const Router: FC = () => {
  return useRoutes(routes);
};

export default Router;

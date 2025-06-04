import {
    type RouteConfig,
    route,
  } from "@react-router/dev/routes";
export default [
    route("creditos/login", "./routes/login.tsx"),
    route("/dashboard", "./routes/dashboard.tsx"),
] satisfies RouteConfig;
  
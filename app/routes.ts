import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/test", "routes/test.tsx"),
  layout("layouts/authLayout.tsx", [
    route("/login", "routes/login.tsx"),
    route("/signup", "routes/signup.tsx"),
  ]),
  route("/verify", "routes/verifyEmail.tsx"),
  route("/verify/success", "routes/verifySuccess.tsx"),
  ...prefix("/app", [
    layout("layouts/appLayout.tsx", [
      index("routes/dashboard.tsx"),
    ]),
  ])] satisfies RouteConfig;

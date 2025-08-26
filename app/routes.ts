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
    route("/:userId/logout", "routes/logout.tsx"),
    layout("layouts/appLayout.tsx", [
      index("routes/app/dashboard.tsx"),
      layout("routes/app/browse/browseLayout.tsx", [
        route("/lists", "routes/app/browse/lists.tsx"),
        route("/battles", "routes/app/browse/battles.tsx"),
      ]),
      route("/list/:listId", "routes/app/lists/list.tsx"),
      route("/battles/:battleId", "routes/app/battles/battle.tsx"),
      ...prefix("/tools", [
        index("routes/app/tools/index.tsx"),
        route("/calculator", "routes/app/tools/calculator.tsx"),
      ]),
    ]),
  ])] satisfies RouteConfig;

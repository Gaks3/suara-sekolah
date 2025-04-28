import { auth } from "./lib/auth";
import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import users from "./routes/users/users.index";
import reports from "./routes/reports/reports.index";

const app = createApp().basePath("/api").route("/", users).route("/", reports);

configureOpenAPI(app);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

export type AppType = typeof app;

export default app;

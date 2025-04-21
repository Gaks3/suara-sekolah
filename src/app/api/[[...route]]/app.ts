import type { AuthEndpoint } from "better-auth/plugins"

import { auth } from "./lib/auth"
import configureOpenAPI from "./lib/configure-open-api"
import createApp from "./lib/create-app"
import users from "./routes/users/users.index"

const app = createApp().basePath("/api").route("/", users)

configureOpenAPI(app)

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))

export type AppType = typeof app & AuthEndpoint

export default app

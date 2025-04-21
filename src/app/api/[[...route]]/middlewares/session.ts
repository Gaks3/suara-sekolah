import { createMiddleware } from "hono/factory"

import { auth } from "../lib/auth"

export const sessionMiddleware = () =>
  createMiddleware(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    c.set("user", !session ? null : session.user)
    c.set("session", !session ? null : session.session)

    return await next()
  })

import type { Schema } from "hono"

import { OpenAPIHono } from "@hono/zod-openapi"
import { requestId } from "hono/request-id"
import { notFound, onError } from "stoker/middlewares"
import { defaultHook } from "stoker/openapi"

import { pinoLogger } from "../middlewares/pino-logger"
import { sessionMiddleware } from "../middlewares/session"

import type { AppBindings, AppOpenAPI } from "./types.js"

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(requestId()).use(pinoLogger()).use(sessionMiddleware())

  app.notFound(notFound)
  app.onError(onError)
  return app
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/", router)
}

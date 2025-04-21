import { apiReference } from "@scalar/hono-api-reference"

import type { AppOpenAPI } from "./types"
import { auth } from "./auth"

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "0.1.0",
      title: "Suara Sekolah API",
    },
  })

  app.get("/doc/auth", async (c) => {
    const doc = await auth.api.generateOpenAPISchema()

    return c.json(doc)
  })

  app.get(
    "/reference",
    apiReference({
      theme: "deepSpace",
      layout: "modern",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      sources: [
        {
          title: "Primary API",
          url: "/api/doc",
        },
        {
          title: "Authentication API",
          url: "/api/doc/auth",
        },
      ],
    })
  )
}

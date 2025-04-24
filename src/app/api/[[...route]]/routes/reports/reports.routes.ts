import { createRoute, z } from "@hono/zod-openapi"
import * as HTTPStatusCodes from "stoker/http-status-codes"
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers"

import {
  ReportSchema,
  UserSchema,
} from "../../../../../../prisma/generated/zod"
import { authMiddleware } from "../../middlewares/auth"
import { insertReportSchema, listQueryParamsSchema } from "./reports.schemas"
import { IdParamsSchema } from "stoker/openapi/schemas"
import {
  badRequestSchema,
  forbiddenSchema,
  notFoundSchema,
  unauthorizeSchema,
} from "../../lib/schemas/constants"

const tags = ["Reports"]

export const list = createRoute({
  path: "/reports",
  method: "get",
  tags,
  request: {
    query: listQueryParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(ReportSchema) }),
      "The list of reports"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(forbiddenSchema, "Forbidden"),
  },
})

export const getOne = createRoute({
  path: "/reports/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({
        data: ReportSchema.and(z.object({ user: UserSchema })),
      }),
      "The requested report"
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The requested report not found"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizeSchema,
      "Unauthorized"
    ),
  },
})

export const create = createRoute({
  path: "/reports",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: insertReportSchema,
        },
      },
      required: true,
      description: "The report to be create",
    },
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.CREATED]: jsonContent(
      z.object({ data: ReportSchema }),
      "The created report"
    ),
    [HTTPStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "The request is bad"
    ),
    [HTTPStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizeSchema,
      "Unauthorized"
    ),
  },
})

export const patch = createRoute({
  path: "/reports/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "multipart/form-data": {
          schema: insertReportSchema,
        },
      },
      required: true,
      description: "The report to be update",
    },
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: ReportSchema }),
      "The updated report"
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Report not found"
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
})

export const remove = createRoute({
  path: "/reports/{id}",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Report deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Report not found"
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
})

export type ListRoute = typeof list
export type GetOneRoute = typeof getOne
export type CreateRoute = typeof create
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove

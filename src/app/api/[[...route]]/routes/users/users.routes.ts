import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";

import { UserSchema } from "../../../../../../prisma/generated/zod/index";
import { authMiddleware } from "../../middlewares/auth";
import StringIdParamsSchema from "../../lib/schemas/string-id-params-schema";
import {
  badRequestSchema,
  forbiddenSchema,
  notFoundSchema,
} from "../../lib/schemas/constants";
import { insertUserSchema, updateUserSchema } from "./users.schemas";

const tags = ["Users"];

export const list = createRoute({
  path: "/users",
  method: "get",
  tags,
  middleware: authMiddleware("admin"),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(UserSchema) }),
      "The list of users"
    ),
  },
});

export const getOne = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: UserSchema }),
      "The requested user"
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
});

export const create = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertUserSchema, "The user to create"),
  },
  middleware: authMiddleware("admin"),
  responses: {
    [HTTPStatusCodes.CREATED]: jsonContent(
      z.object({ data: UserSchema }),
      "The created user"
    ),
    [HTTPStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "The request is bad"
    ),
  },
});

export const patch = createRoute({
  path: "/users/{id}",
  method: "patch",
  tags,
  request: {
    params: StringIdParamsSchema,
    body: {
      content: {
        "multipart/form-data": {
          schema: updateUserSchema,
        },
      },
      required: true,
    },
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: UserSchema }),
      "The updated user"
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
});

export const remove = createRoute({
  path: "/users/{id}",
  method: "delete",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "User deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
export type CreateRoute = typeof create;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;

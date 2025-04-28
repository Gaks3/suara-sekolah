import { z } from "zod"

import { ReportSchema } from "../../../../../../prisma/generated/zod"
import { imageSchema } from "../../lib/schemas/image-schema"

export const listQueryParamsSchema = z.object({
  search: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "search",
        in: "query",
      },
      example: "The title of report",
    }),
  sort: z
    .enum(["desc", "asc"])
    .optional()
    .default("desc")
    .openapi({
      param: {
        name: "sort",
        in: "query",
      },
      example: "desc",
    }),
})

export const insertReportSchema = ReportSchema.omit(
  {
    createdAt: true, 
    updatedAt: true, 
    userId: true, 
    id: true
  }
).extend({
  image: imageSchema.optional(),
})

import { z } from "zod"

import { UserSchema } from "../../../../../../prisma/generated/zod/index"
import { imageSchema } from "../../lib/schemas/image-schema"

export const containsUppercase = (str: string) => /[A-Z]/.test(str)

export const containsNumber = (str: string) => /\d/.test(str)

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

  return specialChars.test(str)
}

export const passwordSchema = z.string().superRefine((value, ctx) => {
  if (value.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Must be 8 or more characters long",
      fatal: true,
    })

    return z.NEVER
  }

  if (!containsUppercase(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one uppercase letter",
      fatal: true,
    })

    return z.NEVER
  }

  if (!containsNumber(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one number",
      fatal: true,
    })

    return z.NEVER
  }

  if (!containsSpecialChars(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one special characters (@, #, $, etc.)",
      fatal: true,
    })

    return z.NEVER
  }
})

export const insertUserSchema = UserSchema.pick({
  email: true,
  name: true,
  role: true,
}).extend({
  password: passwordSchema,
  image: imageSchema.optional(),
})

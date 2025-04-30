import { z } from "zod";

import { UserSchema } from "../../../../../../prisma/generated/zod/index";
import { imageSchema } from "../../lib/schemas/image-schema";
import { UserRole } from "@prisma/client";

export const containsUppercase = (str: string) => /[A-Z]/.test(str);

export const containsNumber = (str: string) => /\d/.test(str);

export const containsSpecialChars = (str: string) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return specialChars.test(str);
};

export const passwordSchema = z.string().superRefine((value, ctx) => {
  if (value.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Must be 8 or more characters long",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsUppercase(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one uppercase letter",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsNumber(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one number",
      fatal: true,
    });

    return z.NEVER;
  }

  if (!containsSpecialChars(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least contains one special characters (@, #, $, etc.)",
      fatal: true,
    });

    return z.NEVER;
  }
});

export const insertUserSchema = UserSchema.pick({
  email: true,
  name: true,
  role: true,
  nip: true,
  nis: true,
  phone: true,
})
  .extend({
    password: passwordSchema,
    image: imageSchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.role === "guru" && typeof value.nip === "undefined")
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The field nip is required",
        fatal: true,
      });

    if (value.role === "siswa" && typeof value.nis === "undefined")
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The field nis is required",
        fatal: true,
      });

    if (
      value.role === "karyawan" &&
      typeof value.nis !== "undefined" &&
      typeof value.nip === "undefined"
    )
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please leave the nis and nip input blank",
        fatal: true,
      });
  });

export const signUpSchema = UserSchema.pick({
  nip: true,
  nis: true,
})
  .extend({
    name: z.string().trim().min(1, "The field name is required"),
    email: z.string().email(),
    phone: z.string().trim().min(1, "The field is required"),
    role: z.enum([UserRole.guru, UserRole.karyawan, UserRole.siswa]),
    password: passwordSchema,
    nip: z.string().nullable().optional(),
    nis: z.string().nullable().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.role === "guru" && value.nip?.trim().length === 0)
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The field nip is required",
        fatal: true,
        path: ["nip"],
      });

    if (value.role === "siswa" && value.nis?.trim().length === 0) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The field nis is required",
        fatal: true,
        path: ["nis"],
      });
    }

    if (
      value.role === "karyawan" &&
      value.nis?.trim().length !== 0 &&
      value.nip?.trim().length !== 0
    )
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please leave the nis and nip input blank",
        fatal: true,
        path: ["nis", "nip"],
      });
  });

export const updateUserSchema = UserSchema.pick({
  email: true,
  name: true,
  role: true,
  nip: true,
  nis: true,
  phone: true,
})
  .extend({
    password: passwordSchema,
    image: imageSchema.optional(),
  })
  .partial()
  .superRefine((value, ctx) => {
    if (value.role === "guru" && typeof value.nip === "undefined")
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The field nip is required",
        fatal: true,
      });

    if (value.role === "siswa" && typeof value.nis === "undefined")
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The field nis is required",
        fatal: true,
      });

    if (
      value.role === "karyawan" &&
      typeof value.nis !== "undefined" &&
      typeof value.nip === "undefined"
    )
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please leave the nis and nip input blank",
        fatal: true,
      });
  });

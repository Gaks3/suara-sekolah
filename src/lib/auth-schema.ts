import { passwordSchema } from "@/app/api/[[...route]]/routes/users/users.schemas";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().email(),
    name: z.string().trim().min(1, "The field name is required"),
    phone: z.string().trim().min(1, "The field phone is required"),
    nis: z.string().nullable(),
    nip: z.string().nullable(),
    role: z.enum([UserRole.guru, UserRole.karyawan, UserRole.siswa]),
    password: passwordSchema,
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

export const signInSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

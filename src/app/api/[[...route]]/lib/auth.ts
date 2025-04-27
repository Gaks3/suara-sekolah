import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin, openAPI } from "better-auth/plugins";

import { User, UserRoleSchema } from "../../../../../prisma/generated/zod";
import db from "./db";
import { ac, admin, guru, karyawan, siswa } from "./permissions";
import { UserRole } from "@prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "mysql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
  },
  appName: "Suara Sekolah",
  user: {
    additionalFields: {
      role: {
        type: "string",
        validator: {
          input: UserRoleSchema.refine((value) => value === "admin", {
            message: "Forbidden",
          }),
        },
        input: true,
      },
      phone: {
        type: "string",
      },
      nis: {
        type: "string",
        required: false,
      },
      nip: {
        type: "string",
        required: false,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const formattedUser = user as User;

          if (formattedUser.nis)
            await db.user.update({
              where: { id: formattedUser.id },
              data: { role: "siswa" },
            });
          else if (formattedUser.nip)
            await db.user.update({
              where: { id: formattedUser.id },
              data: { role: "guru" },
            });
          else if (!formattedUser.nis && !formattedUser.nip)
            await db.user.update({
              where: { id: formattedUser.id },
              data: { role: "karyawan" },
            });
        },
      },
    },
  },
  plugins: [
    openAPI(),
    adminPlugin({
      ac,
      roles: {
        siswa,
        guru,
        karyawan,
        admin,
      },
      defaultRole: UserRole.siswa,
    }),
  ],
});

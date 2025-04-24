import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin, openAPI } from "better-auth/plugins"

import db from "./db"

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
      },
      phone: {
        type: "string",
      },
      nis: {
        type: "string",
      },
      nip: {
        type: "string",
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [openAPI(), admin()],
})

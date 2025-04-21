import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { openAPI } from "better-auth/plugins"

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
    },
  },
  plugins: [openAPI()],
})

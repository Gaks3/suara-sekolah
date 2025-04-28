import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";

import { UserRoleSchema } from "../../prisma/generated/zod";
import {
  ac,
  guru,
  karyawan,
  siswa,
  admin,
} from "@/app/api/[[...route]]/lib/permissions";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    inferAdditionalFields({
      user: {
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
    }),
    adminClient({
      ac,
      roles: {
        siswa,
        guru,
        karyawan,
        admin,
      },
    }),
  ],
});

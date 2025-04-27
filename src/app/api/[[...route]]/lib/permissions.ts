import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  report: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const siswa = ac.newRole({
  report: ["create", "read", "update", "delete"],
});

export const guru = ac.newRole({
  report: ["create", "read", "update", "delete"],
});

export const karyawan = ac.newRole({
  report: ["create", "read", "update", "delete"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
});

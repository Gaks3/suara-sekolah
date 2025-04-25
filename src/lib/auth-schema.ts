import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama harus terdiri dari minimal 2 karakter" })
    .max(50, { message: "Nama tidak boleh lebih dari 50 karakter" }),
  email: z
    .string()
    .email({ message: "Silakan masukkan alamat email yang valid" })
    .min(2, { message: "Email harus terdiri dari minimal 2 karakter" })
    .max(50, { message: "Email tidak boleh lebih dari 50 karakter" }),
  password: z
    .string()
    .min(8, { message: "Kata sandi harus terdiri dari minimal 8 karakter" })
    .max(50, { message: "Kata sandi tidak boleh lebih dari 50 karakter" }),
  role: z.enum(["siswa", "guru", "karyawan", "admin"], {
    message: "Silakan pilih peran yang sesuai",
  }),
});

export const signInSchema = formSchema.pick({
  email: true,
  password: true,
});

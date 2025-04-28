"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formSchema } from "@/lib/auth-schema"
import { useEffect, useState } from "react"
import { AtSign, KeyRound, UserPlus, Eye, EyeOff, User, UserCog } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authClient } from "@/lib/auth-client"
import { signUpSchema } from "@/app/api/[[...route]]/routes/users/users.schemas"
import { UserRole } from "@prisma/client"
import { APIClient } from "@/lib/api-client"
import { toast } from "sonner"
import { PasswordInput } from "@/components/password-input"
import { PhoneInput } from "@/components/phone-input"

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter()
  
  const roles = Object.values(UserRole);
  roles.pop()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      role: "karyawan",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    try {
      const formattedValues = {...values}

      if(values.role === "karyawan") {
        delete formattedValues.nis;
        delete formattedValues.nip;
      } else if(values.role === "siswa") {
        delete formattedValues.nip
      } else if(values.role === "guru") {
        delete formattedValues.nis
      }

      const {data, error} = await authClient.signUp.email({
        ...values,
      }, {
        onSuccess: () => {
          form.reset();
          toast.success("Sign up success");
          router.push("/");
        },
        onError: ({ error }) => {
          let errorMessage = error.message;

          if (
            errorMessage.includes("already exists") ||
            errorMessage.includes("duplicate")
          ) {
            errorMessage =
              "This email already used, please enter another email.";
          }

          toast.error("Sign up failed", {
            description: errorMessage,
          });

          form.setError("email", {
            type: "manual",
            message: errorMessage,
          });
        },
      },
      )

    } catch (error) {
      console.log(error);
      toast.error("Failed to create user");
    }
  };

  const selectedRole = form.watch("role");

  useEffect(() => {
    if (selectedRole === "guru") {
      form.setValue("nip", "");
      form.resetField("nis")
    }
      if (selectedRole === "siswa") {
        form.setValue("nis", "");
        form.resetField("nip")
      }
  }, [selectedRole, form]);

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl border shadow-md rounded-xl overflow-hidden">

        <CardHeader className="space-y-1 pb-2 pt-4">
          <CardTitle className="text-2xl font-bold text-center">Daftar</CardTitle>
          <CardDescription className="text-center text-gray-500">Buat Akun Anda Untuk Melapor!</CardDescription>
        </CardHeader>
        {/* {errorMessage && (
          <div className="mx-8 md:mx-12 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mx-8 md:mx-12 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
            {successMessage}
          </div>
        )} */}

        <CardContent className="space-y-6 pt-4 px-8 md:px-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Your strong password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="w-full capitalize"
                          placeholder="Select an role"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((value, index) => (
                        <SelectItem
                          key={index}
                          value={value}
                          className="capitalize"
                        >
                          {value.split(" ").map((value) => value.at(0)?.toUpperCase() + value.slice(1)).join(" ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedRole === "guru" && (
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        autoComplete="nip"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {selectedRole === "siswa" && (
              <FormField
                control={form.control}
                name="nis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIS</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="number"
                        autoComplete="nis"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
                type="submit"
                className="w-full py-2.5 md:py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center">Signing Up...</div>
                ) : (
                  <>
                    Daftar Sekarang <UserPlus className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
          </form>
        </Form>
        </CardContent>

        <CardFooter className="flex justify-center px-8 py-6">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

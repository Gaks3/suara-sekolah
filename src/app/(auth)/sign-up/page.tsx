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
import { useState } from "react"
import { AtSign, KeyRound, UserPlus, Eye, EyeOff, User, UserCog } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignUpPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    shouldFocusError: false,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "siswa",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          image: null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        let errorMsg = data.message || "Registration failed"

        if (errorMsg.includes("already exists") || errorMsg.includes("duplicate")) {
          errorMsg = "This email is already registered. Please use another email."
        }

        setErrorMessage(errorMsg)
        form.setError("email", {
          type: "manual",
          message: errorMsg,
        })
        return
      }

      form.reset()
      setSuccessMessage("Sign up successful!")

      setTimeout(() => {
        router.push("/sign-in")
      }, 2000)
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.")
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl border shadow-md rounded-xl overflow-hidden">

        <CardHeader className="space-y-1 pb-2 pt-4">
          <CardTitle className="text-2xl font-bold text-center">Daftar</CardTitle>
          <CardDescription className="text-center text-gray-500">Buat Akun Anda Untuk Melapor!</CardDescription>
        </CardHeader>
        {errorMessage && (
          <div className="mx-8 md:mx-12 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mx-8 md:mx-12 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <CardContent className="space-y-6 pt-4 px-8 md:px-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Nama</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Masukan Nama Anda"
                          className="pl-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AtSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Masukan email Anda"
                          className="pl-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Role</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserCog className="h-5 w-5 text-gray-400" />
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="pl-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="siswa">Siswa</SelectItem>
                          <SelectItem value="guru">Guru</SelectItem>
                          <SelectItem value="karyawan">Karyawan</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyRound className="h-5 w-5 text-gray-400" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Masukan password Anda"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10 py-2 bg-transparent border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {!showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-2.5 md:py-3 rounded-lg bg-blue-700 hover:bg-blue-700/90 text-white font-medium flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
            <Link href="/sign-in" className="text-blue-700 font-medium hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

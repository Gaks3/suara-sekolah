"use client";

import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

import { insertUserSchema } from "@/app/api/[[...route]]/routes/users/users.schemas";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/password-input";
import { PhoneInput } from "@/components/phone-input";
import { APIClient } from "@/lib/api-client";
import { useEffect } from "react";

type InsertUserSchema = z.infer<typeof insertUserSchema>;

export default function UserCreateDialog() {
  const router = useRouter();

  const roles = Object.values(UserRole);

  const form = useForm<InsertUserSchema>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      role: "siswa",
      nis: "",
    },
  });

  const onSubmit = async (values: InsertUserSchema) => {
    try {
      const res = await APIClient.api.users.$post(
        {
          json: {
            email: values.email,
            name: values.name,
            phone: values.phone,
            password: values.password,
            role: values.role,
            nip: values.role === "guru" ? values.nip : null,
            nis: values.role === "siswa" ? values.nis : null,
          },
        },
        {
          init: {
            credentials: "include",
          },
        }
      );

      const json = await res.json();

      if (res.ok) {
        toast.success("Successfully to create user");

        form.reset();
        router.refresh();
      } else if ("message" in json) toast.error(json.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create user");
    }
  };

  const selectedRole = form.watch("role");

  useEffect(() => {
    if (selectedRole === "guru") form.setValue("nip", "");
    else if (selectedRole === "siswa") form.setValue("nis", "");
  }, [selectedRole]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-100px)]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
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
                    Password{" "}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
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
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("role") === "guru" && (
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || undefined}
                        autoComplete="nip"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {form.watch("role") === "siswa" && (
              <FormField
                control={form.control}
                name="nis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIS</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || undefined}
                        autoComplete="nis"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { UserRoundPenIcon } from "lucide-react";

import { updateUserSchema } from "@/app/api/[[...route]]/routes/users/users.schemas";
import { DataType } from "@/app/(admin)/admin/users/columns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export default function UserUpdateDialog({ user }: { user: DataType }) {
  const router = useRouter();

  const roles = Object.values(UserRole);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      password: undefined,
      phone: user.phone,
      role: user.role,
      nip: user.nip || undefined,
      nis: user.nis || undefined,
    },
  });

  const onSubmit = async (values: UpdateUserSchema) => {
    try {
      const res = await APIClient.api.users[":id"].$patch(
        {
          param: {
            id: user.id,
          },
          form: {
            email: values.email,
            name: values.name,
            phone: values.phone,
            ...(values.password && { password: values.password }),
            role: values.role,
            ...(values.role === "guru" && { nip: values.nip }),
            ...(values.role === "siswa" && { nis: values.nis }),
          },
        },
        {
          init: {
            credentials: "include",
          },
        }
      );

      const json = await res.json();

      if (res.ok) toast.success("Successfully to update user");
      else if ("message" in json) toast.error(json.message);

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user");
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UserRoundPenIcon className="mr-1" />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100vh-100px)]">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
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
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

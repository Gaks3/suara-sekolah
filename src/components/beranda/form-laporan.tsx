"use client";

import type React from "react";
import { useRef, useState } from "react";
import {
  CalendarIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIClient } from "@/lib/api-client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ReportSchema } from "../../../prisma/generated/zod";
import { imageSchema } from "@/app/api/[[...route]]/lib/schemas/image-schema";
import { ReportDepartment } from "@prisma/client";

const classificationOptions = [
  { id: "PENGADUAN", label: "Pengaduan" },
  { id: "ASPIRASI", label: "Aspirasi" },
  { id: "PERMINTAAN_INFORMASI", label: "Informasi" },
];

const insertReportSchema = ReportSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  status: true
}).extend({
  anonym: z.coerce.boolean(),
  image: imageSchema.optional(),
});

type InsertReportSchema = z.infer<typeof insertReportSchema>;

export default function FormLaporan() {
  const departments = Object.values(ReportDepartment)

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<InsertReportSchema>({
    resolver: zodResolver(insertReportSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    form.setValue("image", file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    form.resetField("image");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (values: InsertReportSchema) => {
    try {
      const res = await APIClient.api.reports.$post(
        {
          form: {
            ...values,
          },
        },
        {
          init: {
            credentials: "include",
          },
        }
      );

      if (res.status === 201) {
        toast.success("Laporan berhasil dikirim!");
        form.reset()
      } else {
        toast.error("Gagal mengirim laporan!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim laporan!");
    }
  };

  return (
    <Card className="w-full max-w-[600px] mx-auto border-2 mt-6 mb-6 md:mt-10 md:mb-10 px-2 sm:px-4 md:px-6">
      <CardHeader className="text-center px-3 sm:px-4 md:px-6">
        <CardTitle className="text-xl sm:text-1xl font-bold bg-primary py-1.5 text-white rounded-lg">
          Sampaikan Laporan Anda Disini
        </CardTitle>
        <p className="text-xs pt-2 pb-2">
          Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar.{" "}
          <span className="text-red-600 cursor-pointer">Lihat Panduan!</span>{" "}
        </p>
      </CardHeader>

      <CardContent className="px-3 sm:px-4 md:px-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6 pt-2"
          >
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klasifikasi Laporan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-wrap gap-x-4 gap-y-2"
                      >
                        {classificationOptions.map((option, index) => (
                          <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.id} />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Laporan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukkan judul laporan"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi Laporan</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Masukkan isi laporan"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="incidentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP", { locale: id })
                              : "Pilih tanggal"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                    onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tujuan</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tujuan laporan" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department, index) => (
                        <SelectItem key={index} value={department}>{department.toLowerCase().replaceAll('_', " ").split(" ").map((value) => value.at(0)?.toUpperCase() + value.slice(1)).join(" ")}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Foto</FormLabel>
                    <>
                      {!imagePreview ? (
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
                            isDragging ? "border-primary bg-primary/10" : ""
                          }`}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3 sm:pt-5 sm:pb-6">
                            <UploadIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-muted-foreground" />
                            <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-muted-foreground text-center">
                              <span className="font-semibold">
                                Klik untuk upload
                              </span>{" "}
                              <span className="hidden sm:inline">
                                atau drag and drop
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                              PNG, JPG atau JPEG (Maks. 10MB)
                            </p>
                          </div>
                          <FormControl>
                            <Input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </FormControl>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="aspect-square w-full overflow-hidden rounded-lg">
                            <img
                              src={
                                imagePreview ||
                              '/placeholder.svg?height=350&width=350'
                              }
                              alt="Foto"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={handleRemoveImage}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-blue-500"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Mengirim..." : "Kirim Laporan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

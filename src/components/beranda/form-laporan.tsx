"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormLaporan() {
  const [date, setDate] = useState<Date>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)

    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")

    // Reset form after submission
    const form = e.target as HTMLFormElement
    form.reset()
    setDate(undefined)
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  return (
    <Card className="w-full max-w-[600px] mx-auto border-2 mt-6 mb-6 md:mt-10 md:mb-10 px-2 sm:px-4 md:px-6">
      <CardHeader className="text-center px-3 sm:px-4 md:px-6">
        <CardTitle className="text-xl sm:text-1xl font-bold bg-blue-600 py-1.5 text-white rounded-lg">
          Sampaikan Laporan Anda Disini
        </CardTitle>
        <p className="text-xs pt-2 pb-2">
          Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar.{" "}
          <span className="text-red-600 cursor-pointer ">Lihat Panduan!</span>{" "}
        </p>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="judul" className="text-black">
              Judul Laporan
            </Label>
            <Input id="judul" placeholder="Masukkan judul laporan" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isi" className="text-black">
              Isi Laporan
            </Label>
            <Textarea id="isi" placeholder="Masukkan isi laporan secara detail" className="min-h-[120px]" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tanggal" className="text-black">
              Tanggal
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: id }) : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tujuan" className="text-black">
              Tujuan
            </Label>
            <Select required>
              <SelectTrigger id="tujuan">
                <SelectValue placeholder="Pilih tujuan laporan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guru">Guru</SelectItem>
                <SelectItem value="tu">TU</SelectItem>
                <SelectItem value="kesiswaan">Kesiswaan</SelectItem>
                <SelectItem value="bk">BK</SelectItem>
                <SelectItem value="kepala-sekolah">Kepala Sekolah</SelectItem>
                <SelectItem value="kebersihan">Badan Kebersihan</SelectItem>
                <SelectItem value="keamanan">Keamanan</SelectItem>
                <SelectItem value="sarpras">SarPras</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto" className="text-black">
              Upload Foto
            </Label>
            <div className="grid gap-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="foto"
                  className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-3 pb-3 sm:pt-5 sm:pb-6">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-muted-foreground" />
                    <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-muted-foreground text-center">
                      <span className="font-semibold">Klik untuk upload</span>{" "}
                      <span className="hidden sm:inline">atau drag and drop</span>
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">PNG, JPG atau JPEG (Maks. 10MB)</p>
                  </div>
                  <Input id="foto" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {previewUrl && (
                <div className="relative mt-2">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-auto max-h-48 object-contain rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedFile(null)
                      setPreviewUrl(null)
                      const fileInput = document.getElementById("foto") as HTMLInputElement
                      if (fileInput) fileInput.value = ""
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-700 text-white hover:bg-blue-50">
            Kirim Laporan
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

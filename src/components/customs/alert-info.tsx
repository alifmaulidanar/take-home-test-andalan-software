import React from 'react'
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertInfo() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Informasi</AlertTitle>
      <AlertDescription>
        Aksi ini tidak akan memengaruhi data asli karena hanya memanfaatkan layanan API publik dari Reqres.
      </AlertDescription>
    </Alert>
  )
}

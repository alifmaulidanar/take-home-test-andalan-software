import React from 'react'
import Link from 'next/link'
import { Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ResourcesCard() {
  return (
    <Link href="/resources">
      <Button
        variant="outline"
        size="icon"
        className="flex flex-col items-center justify-center w-64 h-64 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200"
      >
        <Palette style={{ width: '3rem', height: '3rem' }} className="text-red-600 mb-4" />
        <p className="text-lg font-medium text-gray-800">Resources</p>
      </Button>
    </Link>
  )
}

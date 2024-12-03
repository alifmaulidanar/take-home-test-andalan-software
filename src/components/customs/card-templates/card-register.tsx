import React from 'react'
import Link from 'next/link'
import { UserRoundPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RegisterCard() {
  return (
    <Link href="/register">
      <Button
        variant="outline"
        size="icon"
        className="flex flex-col items-center justify-center w-64 h-64 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200"
      >
        <UserRoundPlus style={{ width: '3rem', height: '3rem' }} className="text-yellow-600 mb-4" />
        <p className="text-lg font-medium text-gray-800">Register</p>
      </Button>
    </Link>
  )
}

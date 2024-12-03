import React from 'react'
import Link from 'next/link'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function UsersCard() {
  return (
    <Link href="/users">
      <Button
        variant="outline"
        size="icon"
        className="flex flex-col items-center justify-center w-64 h-64 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200"
      >
        <User style={{ width: '3rem', height: '3rem' }} className="text-blue-600 mb-4" />
        <p className="text-lg font-medium text-gray-800">Users</p>
      </Button>
    </Link>
  )
}

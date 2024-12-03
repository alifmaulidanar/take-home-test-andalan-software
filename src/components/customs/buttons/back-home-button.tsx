import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'

export default function BackHomeButton() {
  const router = useRouter();

  return (
    <div className="mb-6 text-center">
      <Button onClick={() => router.push('/')} className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500">
        Back to Home
      </Button>
    </div>
  )
}

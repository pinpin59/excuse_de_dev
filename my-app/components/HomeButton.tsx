import { Button } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

export default function HomeButton({className}: {className?: string}) {
  return (
    <Link href="/">
        <Button className={className} color="secondary" size="lg">Back</Button>
    </Link>
  )
}

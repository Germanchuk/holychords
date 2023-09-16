import TheFooter from '@/components/TheFooter/TheFooter'
import TheHeader from '@/components/TheHeader/TheHeader'
import React from 'react'

export default function RegularLayout({children}) {
  return (
    <>
    <TheHeader />
    <main>
        {children}
    </main>
    <TheFooter />
    </>
  )
}

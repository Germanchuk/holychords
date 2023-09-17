import TheFooter from '@/components/TheFooter/TheFooter'
import TheHeader from '@/components/TheHeader/TheHeader'
import React from 'react'
import styles from "./regularLayout.module.css";

export default function RegularLayout({children}) {
  return (
    <>
    <div>
    <TheHeader />
    <div className={styles.container}>
      {children}
    </div>
    </div>
    <TheFooter />
    </>
  )
}

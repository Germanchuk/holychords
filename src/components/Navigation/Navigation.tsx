"use client";
import React from 'react'
import AuthButton from './AuthButton/AuthButton'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const menuItems = [
  {
    href: "/",
    title: "Home"
  },
  {
    href: "/protected",
    title: "Protected"
  }, 
  {
    href: "/serverAction",
    title: "Server action"
  },
  {
    href: "/apiFromClient",
    title: "Get from client example"
  },
  {
    href: "/apiFromServer",
    title: "Get on server"
  }
]

export default function Navigation() {
  const path = usePathname();

  return (
    <>
      <div className={styles.navigation}>
        {menuItems.map(item => {
        return (
          <Link
            key={item.href}
            href={item.href}
            className={path === item.href ? "active" : ""}
          >
            {item.title}
          </Link>
        )
        })}
      </div>
      <div>
        <AuthButton />
      </div>
    </>
  )
}

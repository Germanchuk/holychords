"use client";
import React from 'react'
import styles from "./homePage.module.css"
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const  [ value, setValue ] = React.useState("");
  const { push } = useRouter();

  function handleClick() {
    const arr = value.split("/");
    console.log("go go go")
    push(`/${arr[arr.length - 1]}`);
  }

  return (
    <div className={styles.wrapper}>
      <h2>Parse any song from holychords!</h2>
      <div>
        <input
          type="text"
          value={value} 
          onChange={e => setValue(e.target.value)} 
        />
        <button onClick={handleClick}>Go!</button>
      </div>
    </div>
  )
}

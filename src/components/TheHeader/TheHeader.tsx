import React from 'react';
import styles from './header.module.css';
import Navigation from '../Navigation/Navigation';

export default function TheHeader() {
  return (
    <header className={styles.Header}>
        <h1>The Header</h1>
        <Navigation />
    </header>
  )
}

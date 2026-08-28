"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";
import styles from "./header.module.css";

export function Header() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          README Generator
        </Link>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={
            mounted
              ? `Switch to ${theme === "light" ? "dark" : "light"} mode`
              : "Toggle theme"
          }
        >
          {mounted ? (
            theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>
      </div>
    </header>
  );
}

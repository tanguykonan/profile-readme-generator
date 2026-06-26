"use client";

import {
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import styles from "./card.module.css";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Highlight with accent border */
  selected?: boolean;
  /** Render as a different element (default: div) */
  as?: ElementType;
}

export function Card({
  children,
  selected = false,
  onClick,
  className,
  as: Component = "div",
  ...rest
}: CardProps) {
  const isSelectable = !!onClick;

  const classNames = [
    styles.card,
    isSelectable && styles.selectable,
    selected && styles.selected,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (isSelectable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
    }
  };

  return (
    <Component
      className={classNames}
      onClick={onClick}
      onKeyDown={isSelectable ? handleKeyDown : undefined}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      aria-pressed={isSelectable ? selected : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

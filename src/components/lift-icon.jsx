import React from "react";

import { slugify } from "@/lib/warmup";

function BarbellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2 10h2v4H2zm3-2h2v8H5zm3 3h8v2H8zm9-3h2v8h-2zm3 2h2v4h-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function SquatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="2" fill="currentColor" />
      <path
        d="M4 7h5l3 2 3-2h5v2h-4.4l-2.7 1.8V14l3.1 2.4-.9 1.6L12 15.7 8.9 18l-.9-1.6L11 14v-3.2L8.4 9H4zM9 19h2v3H9zm4 0h2v3h-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function BenchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2 8h2v4H2zm18 0h2v4h-2zm-3-2h2v8h-2zM5 10h10v2H5zm2 3h2v5H7zm6 0h2v5h-2zM9 8h6v2H9z"
        fill="currentColor"
      />
    </svg>
  );
}

function DeadliftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M2 11h2v2H2zm18 0h2v2h-2zm-2-2h1v6h-1zm-2 1h1v4h-1zM7 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM6.5 10h1.5v4l-1.5 5H5l1.5-5zm6 0H14l1.5 9H14l-1.5-5zM8 11h5v2H8z"
        fill="currentColor"
      />
    </svg>
  );
}

function PressIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="2" fill="currentColor" />
      <path
        d="M2 7h4v2H2zm16 0h4v2h-4zm-4-1h4v4h-4zM6 6h4v4H6zm4.5 4h3v4H16l-3 6h-2l1.5-5H10l-1.5 5H6.5L8 14h2.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function CleanIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="10" cy="5" r="2" fill="currentColor" />
      <path
        d="M2 12h2v3H2zm18 0h2v3h-2zm-3-2h2v7h-2zM5 10h2v7H5zm3 1 3-2 2 2 5 1-.3 1.9-5.7-.9-1.3 1v2.5l3.5 1.7-.9 1.8L10 18.1 8 19l-.7-1.8 2.7-1.1V11z"
        fill="currentColor"
      />
    </svg>
  );
}

function RowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="15" cy="5" r="2" fill="currentColor" />
      <path
        d="M2 12h2v2H2zm18 0h2v2h-2zm-3-2h2v6h-2zm-2 1-4 1-2 3H7l2.5-4.1 4-.9L10 8.5l1.1-1.6 4.6 3.1H18v2h-3zm-8 6h6v2H7z"
        fill="currentColor"
      />
    </svg>
  );
}

function DefaultIcon(props) {
  return <BarbellIcon {...props} />;
}

function iconForExercise(name) {
  const key = slugify(name);

  if (key.includes("squat")) {
    return SquatIcon;
  }
  if (key.includes("bench")) {
    return BenchIcon;
  }
  if (key.includes("deadlift")) {
    return DeadliftIcon;
  }
  if (key.includes("overhead") || key === "press") {
    return PressIcon;
  }
  if (key.includes("power-clean") || key.includes("clean")) {
    return CleanIcon;
  }
  if (key.includes("row")) {
    return RowIcon;
  }

  return DefaultIcon;
}

export function LiftIcon({ className = "", name, title = null }) {
  const Icon = iconForExercise(name);

  return (
    <span className={`lift-icon ${className}`.trim()} aria-hidden={title ? undefined : "true"}>
      <Icon className="lift-icon-svg" />
      {title ? <span className="sr-only">{title}</span> : null}
    </span>
  );
}

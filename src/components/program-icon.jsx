import React from "react";

import { slugify } from "@/lib/warmup";

function StartingStrengthIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2 5 5v6c0 4.6 2.9 8.7 7 10 4.1-1.3 7-5.4 7-10V5zm0 4 1.6 3.3 3.7.5-2.7 2.6.6 3.7-3.2-1.7-3.2 1.7.6-3.7-2.7-2.6 3.7-.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function FiveByFiveIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function MaxSingleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 3 4 7v5c0 4.4 3.1 8.4 8 9 4.9-.6 8-4.6 8-9V7zm-1 4h2v8h-2zm-1 1.5L8.5 10 7.3 8.6 11 5h2v11h-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function GreyskullIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 3c-4.4 0-8 3.2-8 7.2 0 2.8 1.7 5.2 4.2 6.4V21h2.3v-2h3V21h2.3v-4.4c2.5-1.2 4.2-3.6 4.2-6.4C20 6.2 16.4 3 12 3zm-2.5 8.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm5 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zM15 15H9v-1.5l1.5-1h3l1.5 1z"
        fill="currentColor"
      />
    </svg>
  );
}

function DefaultProgramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3 9h2v6H3zm4-2h2v10H7zm3 3h4v4h-4zm5-3h2v10h-2zm4 2h2v6h-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function iconForProgram(name) {
  const key = slugify(name);

  if (key === "starting-strength") {
    return StartingStrengthIcon;
  }
  if (key === "5x5") {
    return FiveByFiveIcon;
  }
  if (key === "max-single") {
    return MaxSingleIcon;
  }
  if (key === "greyskull-lp") {
    return GreyskullIcon;
  }

  return DefaultProgramIcon;
}

export function ProgramIcon({ className = "", name, title = null }) {
  const Icon = iconForProgram(name);

  return (
    <span className={`lift-icon ${className}`.trim()} aria-hidden={title ? undefined : "true"}>
      <Icon className="lift-icon-svg" />
      {title ? <span className="sr-only">{title}</span> : null}
    </span>
  );
}

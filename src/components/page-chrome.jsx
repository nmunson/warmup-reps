import Link from "next/link";

import { LiftIcon } from "@/components/lift-icon";

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M4.75 10.25 12 4.5l7.25 5.75v8a1.75 1.75 0 0 1-1.75 1.75h-3.5v-5.25h-4V20h-3.5a1.75 1.75 0 0 1-1.75-1.75z"
        fill="currentColor"
      />
      <path
        d="M3.8 11.45a1 1 0 0 1-.62-1.78l8.2-6.55a1 1 0 0 1 1.24 0l8.2 6.55a1 1 0 1 1-1.24 1.56L12 5.14l-7.58 6.09a1 1 0 0 1-.62.22Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.52 2.31 1.08 2.87.82.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.02-2.67-.1-.26-.44-1.28.1-2.67 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.29 2.74-1.02 2.74-1.02.55 1.39.21 2.41.11 2.67.64.69 1.02 1.58 1.02 2.67 0 3.84-2.34 4.68-4.57 4.93.36.31.67.92.67 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TipIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 20.5a1 1 0 0 1-.63-.22c-1.46-1.19-2.79-2.26-3.97-3.26-2.83-2.39-4.4-4.26-4.4-7.02A4.77 4.77 0 0 1 7.8 5.2c1.67 0 3.19.85 4.2 2.19a5.3 5.3 0 0 1 4.2-2.19A4.77 4.77 0 0 1 21 10c0 2.76-1.57 4.63-4.4 7.02-1.18 1-2.51 2.07-3.97 3.26a1 1 0 0 1-.63.22Z"
        fill="currentColor"
      />
      <path
        d="M12.75 9.05h1.6a.75.75 0 0 1 0 1.5h-1.6v1.15h1.3a.75.75 0 0 1 0 1.5h-1.3v1.36a.75.75 0 0 1-1.5 0V13.2H9.95a.75.75 0 0 1 0-1.5h1.3v-1.15h-1.6a.75.75 0 0 1 0-1.5h1.6V8.4a.75.75 0 0 1 1.5 0z"
        fill="#fff"
      />
    </svg>
  );
}

function IssuesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M11 2h2v11h-2zm0 15h2v2h-2zm1-15a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PageChrome({ children, footer = null, homeHref = null, title = "WarmupReps.com" }) {
  return (
    <div data-role="page" className="ui-page ui-page-theme-a ui-page-active">
      <div data-role="header" className="ui-header ui-bar-inherit" role="banner">
        <h1 className="ui-title" role="heading" aria-level={1}>
          <span className="header-title">
            <LiftIcon className="header-title-icon" name="WarmupReps" />
            <span>{title}</span>
          </span>
        </h1>
        {homeHref ? (
          <Link
            href={homeHref}
            className="ui-btn ui-corner-all ui-btn-left header-home-button"
            aria-label="Home"
          >
            <HomeIcon className="header-home-icon" />
            <span className="sr-only">Home</span>
          </Link>
        ) : null}
      </div>
      <div data-role="content" className="ui-content">
        {children}
      </div>
      {footer}
    </div>
  );
}

export function Footer() {
  return (
    <div data-role="footer" className="ui-footer ui-bar app-footer" data-theme="d">
      <h4 className="footer-title">Links:</h4>
      <div className="footer-links">
        <a href="https://github.com/nmunson/warmup-reps" className="ui-btn ui-btn-inline ui-mini">
          <span className="footer-link-content">
            <GithubIcon className="footer-link-icon" />
            <span>Github</span>
          </span>
        </a>
        <a
          href="https://ko-fi.com/gridlogic"
          className="ui-btn ui-btn-inline ui-mini"
          target="_blank"
          rel="noreferrer"
        >
          <span className="footer-link-content">
            <TipIcon className="footer-link-icon" />
            <span>Tip</span>
          </span>
        </a>
        <a
          href="https://github.com/nmunson/warmup-reps/issues"
          className="ui-btn ui-btn-inline ui-mini"
        >
          <span className="footer-link-content">
            <IssuesIcon className="footer-link-icon" />
            <span>Issues</span>
          </span>
        </a>
      </div>
    </div>
  );
}

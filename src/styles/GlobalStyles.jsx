import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /* Greys */
    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    /* Brand */
    --color-brand-50: #eff6ff;
    --color-brand-500: #3b82f6;
    --color-brand-600: #2563eb;
    --color-brand-700: #1d4ed8;

    /* Semantic colors */
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --color-green-100: #dcfce7;
    --color-green-700: #15803d;

    --color-yellow-100: #fef3c7;
    --color-yellow-700: #b45309;

    --color-blue-100: #dbeafe;
    --color-blue-700: #1d4ed8;

    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4f46e5;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);

    /* Border radius */
    --border-radius-sm: 5px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;

    /* Backdrop */
    --backdrop-color: rgba(0, 0, 0, 0.3);
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-size: 1.4rem;
    line-height: 1.5;
    color: var(--color-grey-700);
    background-color: var(--color-grey-50);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
  }

  a {
    color: var(--color-brand-600);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyles;

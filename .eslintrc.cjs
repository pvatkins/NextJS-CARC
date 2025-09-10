module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "next/core-web-vitals", // Next.js frontend rules
    "prettier"              // turn off formatting rules handled by Prettier
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  ignorePatterns: [
    "dist/**",
    ".next/**",
    "node_modules/**"
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // Example overrides
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
    },
    {
      files: ["backend/**/*.ts", "backend_paypal/**/*.ts"],
      env: { browser: false, node: true }
    },
    {
      files: ["frontend/**/*.ts", "frontend/**/*.tsx"],
      env: { browser: true, node: false }
    }
  ]
};

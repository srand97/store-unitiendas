module.exports = {
  env: {
    browser: true,
    es2021: true, // importante para ES Modules
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module", // 🔹 Esto es lo que habilita import/export
    ecmaFeatures: {
      jsx: true, // necesario para React
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint", "prettier", "import"],
  rules: {
    ...reactHooks.configs.recommended.rules,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
  settings: {
    react: { version: "detect" },
  },
};
// Este archivo de configuración de ESLint está diseñado para un proyecto que utiliza React y TypeScript.
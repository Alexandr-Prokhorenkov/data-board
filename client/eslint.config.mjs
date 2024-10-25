import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier"; // Если используете Prettier
import eslintConfigPrettier from "eslint-config-prettier"; // Отключение конфликтующих правил с Prettier

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: "@typescript-eslint/parser", // Указываем парсер для TypeScript
      parserOptions: {
        ecmaVersion: 2020, // Поддержка ES2020
        sourceType: "module", // Используем модули
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX
        },
      },
    },
    rules: {
      // Ваши правила ESLint
      "react/prop-types": "off", // Отключаем проверку prop-types, если используете TypeScript
      "prettier/prettier": "error", // Применяем правила Prettier как ошибки, если используете
    },
    ...tseslint.configs.recommended,
    ...pluginReact.configs.recommended,
    // Подключаем Prettier
    plugins: {
      prettier: pluginPrettier,
    },
    extends: [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      eslintConfigPrettier, // Отключение конфликтующих правил с Prettier
    ],
  },
];

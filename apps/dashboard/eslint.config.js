import baseConfig, { restrictEnvAccess } from "@order/eslint-config/base";
import nextjsConfig from "@order/eslint-config/nextjs";
import reactConfig from "@order/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

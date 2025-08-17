module.exports = {
  root: true,
  // Ignora archivos que no quieres que ESLint parsee con TS
  ignorePatterns: [
    '.eslintrc.cjs',
    'next.config.*',
    'tailwind.config.*',
    'postcss.config.*',
    'commitlint.config.*',
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '*.d.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'standard-with-typescript',
    'eslint-config-prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'import/order': 'off',
  },
}

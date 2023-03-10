/** @type {import("prettier").Config} */
module.exports = {
  bracketSpacing: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  printWidth: 120,
  singleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

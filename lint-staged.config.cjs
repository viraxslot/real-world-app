module.exports = {
  'src/**/*.{ts,tsx,js,jsx,html,json}': ['prettier --write'],
  'src/**/*.{ts,tsx,js,jsx}': [
    'eslint --fix --max-warnings=0',
    () => 'tsc -p tsconfig.json --noEmit',
    () => 'tsc -p ./e2e/tsconfig.json --noEmit',
    'yarn test:staged'
  ],
};

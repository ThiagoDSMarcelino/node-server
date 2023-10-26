export const parser = '@typescript-eslint/parser';

export const plugins = ['@typescript-eslint', 'prettier'];

export const eslintExtends = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
];

export const rules = {
    'prettier/prettier': 'error',
};
  
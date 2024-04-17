import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
})

export default [
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('airbnb-base'),
  {
    // Objeto de configuração do ESLint com as regras adicionais
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'import/prefer-default-export': 'off',
      'jsx-quotes': ['error', 'prefer-single'],
    },
  },
]

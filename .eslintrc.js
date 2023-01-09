// Configuration module for eslintrc,
// which is a js code (and more) linter.
// eslint is also used to format the code with the vscode ESLint plugin.
// To activate format on save, add "eslint.validate": ["javascript"]" to the .vscode/settings.json file.

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    "plugin:vue/recommended", // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    "indent": ["error", 2],
    "no-console": "off",
    "no-debugger": "error",
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always",
    }],
    "quotes": [
      "error",
      "double",
    ],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never",
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 4,
      "multiline": 1,
    }],
    "vue/attribute-hyphenation": "off",
    "vue/html-closing-bracket-spacing": ["error", {
      "startTag": "never",
      "endTag": "never",
      "selfClosingTag": "always",
    }],
    "vue/multi-word-component-names": "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "import/no-named-as-default": 0,
    "no-unused-vars": "warn",
  },
};
  
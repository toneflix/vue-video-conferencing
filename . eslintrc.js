module.exports = {
  extends: [
    "@vue/standard",
    "prettier",
    "eslint:recommended",
    // add more generic rulesets here, such as:
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'espree', // <-
    ecmaVersion: 2022, // <-
    sourceType: 'module'
  },
}
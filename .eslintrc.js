module.exports = {
  extends: ['@lchxiang/eslint-config'],
  "ignorePatterns": [
    "lib/**",
    "es/**",
    "umd/**",
    "public/**",
    "src/*/__tests__/**",
    "types/index.d.ts",
  ],
  rules: {
    'require-await':0,
    'vue/v-on-event-hyphenation': [
      1,
      'always',
      {
        autofix: true
      }
    ]
  }
}

module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-tailwindcss",
    "stylelint-config-prettier"
  ],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer",
          "custom-variant",
          "theme",
          "themecss",
          "utility",
          "utilities",
          "component",
          "components",
          "base",
          "basecss",
          "config",
          "keyframes",
          "font-face",
          "import",
          "supports",
          "media",
          "container",
          "mixin",
          "include",
          "function",
          "return",
          "if",
          "else",
          "each",
          "for",
          "while"
        ]
      }
    ],

    "custom-property-pattern": null,
    "selector-class-pattern": null,
    "no-invalid-double-slash-comments": null,
    "selector-type-no-unknown": [true, { ignoreTypes: ["/^\\./"] }],

    "no-duplicate-selectors": null,

    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }]
  },
  ignoreFiles: ["**/dist/**", "**/build/**", "**/storybook-static/**"]
};
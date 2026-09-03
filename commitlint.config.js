export default {
  extends: ["@commitlint/config-conventional"]
};

// export default {
//   extends: ["@commitlint/config-conventional"],
//   parserPreset: {
//     parserOpts: {
//       headerPattern: /^(\w+)-\[([A-Z]+-\d+)\]: (.+)$/,
//       headerCorrespondence: ["type", "ticket", "subject"],
//     },
//   },
// };

// export default {
//   extends: ["@commitlint/config-conventional"],
//   parserPreset: {
//     parserOpts: {
//       headerPattern: /^(\w+)-\[([A-Z][A-Z0-9]+-\d+)\]: (.+)$/,
//       headerCorrespondence: ["type", "ticket", "subject"],
//     },
//   },
//   rules: {
//     "type-enum": [
//       2,
//       "always",
//       [
//         "feat",
//         "fix",
//         "chore",
//         "docs",
//         "style",
//         "refactor",
//         "perf",
//         "test",
//         "build",
//         "ci",
//         "revert",
//       ],
//     ],
//     "type-case": [2, "always", "lower-case"],
//     "subject-empty": [2, "never"],
//   },
// };

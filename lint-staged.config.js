import path from "node:path";

const packages = [
  "apps/clients/web/react-lap",
  "apps/servers/express",
  "packages/eslint-config",
  "packages/typescript-config",
];

export default {
  "**/*.{js,jsx,ts,tsx}": (files) => {
    return packages
      .map((pkg) => {
        const pkgFiles = files
          .map((file) => path.relative(process.cwd(), file))
          .filter((file) => file.startsWith(`${pkg}/`))
          .map((file) => path.relative(pkg, file));

        if (!pkgFiles.length) return null;

        return `pnpm --dir ${pkg} exec eslint --max-warnings 0 ${pkgFiles.join(" ")}`;
      })
      .filter(Boolean);
  },
  "**/*.{json,md,css,scss}": (files) => `pnpm exec prettier --write ${files.join(" ")}`,
};

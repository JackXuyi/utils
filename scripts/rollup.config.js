const babel = require("rollup-plugin-babel");
const nodeResolve = require("@rollup/plugin-node-resolve");
const { resolveRootPath, warn } = require("./util");
const { version, name } = require("../package.json");

const extensions = [".js", ".ts"];

module.exports = {
  input: resolveRootPath("./src/index.ts"),
  output: {
    banner: `/* ${name} version ${version} */`,
  },
  onwarn: (warning) => {
    if (typeof warning === "string") {
      warn("building waring: ", warning);
    } else {
      warn("building waring: ", warning.message);
    }
  },
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
  ],
};

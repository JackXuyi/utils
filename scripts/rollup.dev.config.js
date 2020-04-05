const rollup = require("rollup");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("rollup-plugin-replace");
const config = require("./rollup.config");
const { resolveRootPath } = require("./util");
const { main } = require("../package.json");

const realConfig = {
  ...config,
  output: {
    ...config.output,
    format: "cjs",
    file: resolveRootPath(main),
    // dir: resolveRootPath("./es"),
  },
};
if (realConfig.plugins && Array.isArray(realConfig.plugins)) {
  realConfig.plugins = [
    replace({ "process.env.NODE_ENV": JSON.stringify("development") }), // 定义生产环境变量
    commonjs(),
    ...config.plugins,
  ];
}

realConfig.watch = {
  // chokidar,
  clearScreen: false,
  exclude: "node_modules/**",
  include: "src/**",
};

rollup.watch(realConfig);

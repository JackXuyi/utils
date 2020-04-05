const rollup = require("rollup");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const replace = require("rollup-plugin-replace");
// const dts = require("rollup-plugin-dts").default;
const config = require("./rollup.config");
const { resolveRootPath, info } = require("./util");
const {
  main,
  module: moduleName,
  typings,
  unpkg,
  name,
} = require("../package.json");

async function build() {
  // create a bundle
  const realConfig = {
    ...config,
    output: [
      {
        ...config.output,
        format: "amd",
        file: resolveRootPath(moduleName),
        // dir: resolveRootPath("./lib"),
      },
      {
        ...config.output,
        format: "cjs",
        file: resolveRootPath(main),
        // dir: resolveRootPath("./es"),
      },
      {
        ...config.output,
        format: "umd",
        name,
        file: resolveRootPath(unpkg),
        // dir: resolveRootPath("./es"),
      },
      //   { file: typings, format: "cjs" },
    ],
  };
  if (realConfig.plugins && Array.isArray(realConfig.plugins)) {
    realConfig.plugins = [
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }), // 定义生产环境变量
      commonjs(),
      ...config.plugins,
      terser(),
      //   dts(),
    ];
  }
  info("开始编译文件");
  const bundle = await rollup.rollup(realConfig);

  await Promise.all(
    realConfig.output.map(async (item) => {
      // generate code and a sourcemap
      await bundle.generate(item);

      // or write the bundle to disk
      await bundle.write(item);
    })
  );
  info("开始编译文件成功");
}

build();

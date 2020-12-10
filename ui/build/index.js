process.env.NODE_ENV = "production";

const parallel = require("os").cpus().length > 1;
const runJob = parallel ? require("child_process").fork : require;
const { join } = require("path");
const { createFolder } = require("./utils");
const { green, blue } = require("chalk");
const fs = require("fs");

const mapboxgl_css = join(
  __dirname,
  "../node_modules/mapbox-gl/dist/mapbox-gl.css"
);
const mapboxgl_scss = join(__dirname, "../src/css/mapbox-gl.scss");
fs.copyFileSync(mapboxgl_css, mapboxgl_scss);

require("./script.app-ext.js").syncAppExt();
require("./script.clean.js");

console.log(
  ` 📦 Building ${green("v" + require("../package.json").version)}...${
    parallel ? blue(" [multi-threaded]") : ""
  }\n`
);

createFolder("dist");

runJob(join(__dirname, "./script.javascript.js"));
runJob(join(__dirname, "./script.css.js"));

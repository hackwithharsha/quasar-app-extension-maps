const log = function (logger, ...rest) {
  console.log(`[${logger}]`, ...rest);
};
export { log };

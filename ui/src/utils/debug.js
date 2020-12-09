const log = function (logger, ...rest) {
  const captialize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  console.log(`[${captialize(logger)}]`, ...rest);
};
export { log };

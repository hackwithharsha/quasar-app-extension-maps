// import { log } from "./debug";
const _find = (what, where) => {
  // const { maps } = window;
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!!where[what]) {
        // log(maps.mode, where[what]);
        clearInterval(interval);
        resolve(where[what]);
      }
    }, 200);
  });
};

export default _find;

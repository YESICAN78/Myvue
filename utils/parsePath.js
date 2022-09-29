/*
 * @Author: sunFulin
 * @Date: 2022-09-29 15:04:14
 * @LastEditTime: 2022-09-29 15:04:56
 */
export default function parsePath(path) {
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < arguments.length; i++) {
      if (!obj) return;
      obj = obj[segments];
    }
    return obj;
  };
}

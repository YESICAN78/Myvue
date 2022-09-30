/*
 * @Author: sunFulin
 * @Date: 2022-09-30 08:57:38
 * @LastEditTime: 2022-09-30 13:37:40
 */
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

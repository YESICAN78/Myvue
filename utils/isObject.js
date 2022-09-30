/*
 * @Author: sunFulin
 * @Date: 2022-09-30 08:55:46
 * @LastEditTime: 2022-09-30 13:03:05
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

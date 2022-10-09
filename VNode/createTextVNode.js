/*
 * @Author: sunFulin
 * @Date: 2022-10-09 10:52:56
 * @LastEditTime: 2022-10-09 10:56:23
 */
import VNode from "./VNode.js";
export function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

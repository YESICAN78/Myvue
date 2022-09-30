/*
 * @Author: sunFulin
 * @Date: 2022-09-30 16:13:26
 * @LastEditTime: 2022-09-30 16:24:15
 */
const seenObjects = new Set();
import { isObject } from "./isObject.js";
export function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}
function _traverse(val, seen) {
  const isA = Array.isArray(val);
  let i, keys;
  if ((!isA && isObject(val) !== "object") || Object.isFrozen(val)) {
    //Object.isFrozen val 对象是否被冻结
    return;
  }
  if (val.__ob__) {
    const depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) _traverse(val[i], seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) _traverse(val[keys[i]], seen);
  }
}

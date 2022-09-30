/*
 * @Author: sunFulin
 * @Date: 2022-09-30 08:55:46
 * @LastEditTime: 2022-09-30 13:10:40
 */
import { hasOwn } from "./hasOwn.js";
import { isObject } from "./isObject.js";
import Observer from "../Observer.js";
export function observer(value) {
  if (isObject(value) !== "Object") {
    return;
  }
  let ob;
  if (hasOwn(value, "__ob__")) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

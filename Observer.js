/*
 * @Author: sunFulin
 * @Date: 2022-09-29 15:06:42
 * @LastEditTime: 2022-09-29 17:31:01
 */
import Deps from "./Dep.js";
/**
 * Observer 类会被附加倒每个侦测的object上
 * 一旦被附加上的属性，Observe会将object的所有属性转换为getter/serter的形式
 * 来收集属性的依赖，并且当属性变化的时会通知这些依赖
 * */
export default class Observer {
  constructor(value) {
    this._value = value;
    if (!Array.isArray(value)) {
      this.walk(value);
    }
  }
  walk(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
}
function defineReactive(obj, key, val) {
  if (typeof val === "object") {
    new Observer(val);
  }

  // 收集依赖
  let dep = new Deps();
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: () => {
      dep.depend();
      return val;
    },
    set: (newVal) => {
      if (val === newVal) {
        return;
      }
      val = newVal;
      // 更新依赖
      dep.notify();
    },
  });
}

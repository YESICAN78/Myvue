/*
 * @Author: sunFulin
 * @Date: 2022-09-29 14:58:30
 * @LastEditTime: 2022-09-29 15:38:40
 */
import parsePath from "./utils/parsePath.js";
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }
  get() {
    window.target = this;
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
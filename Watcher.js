/*
 * @Author: sunFulin
 * @Date: 2022-09-29 14:58:30
 * @LastEditTime: 2022-09-30 16:25:32
 */
import parsePath from "./utils/parsePath.js";
import { traverse } from "./utils/traverse.js";
export default class Watcher {
  // options 的参数 deep
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    // deep 的实现原理
    if (options) {
      this.deep = !!options.deep;
    } else {
      this.deep = false;
    }
    this.deps = [];
    this.depIds = new Set();
    //expOrFn 参数支持函数
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    this.cb = cb;
    this.value = this.get();
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
    }
  }
  get() {
    window.target = this;
    let value = this.getter.call(vm, vm);
    if (this.deep) {
      traverse(value);
    }
    window.target = undefined;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

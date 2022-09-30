/*
 * @Author: sunFulin
 * @Date: 2022-09-29 14:53:56
 * @LastEditTime: 2022-09-30 15:45:27
 */
let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    remove(this.subs, sub);
  }
  depend() {
    if (window.target) {
      // this.addSub(window.target);
      window.target.addDep(this);
    }
  }
  notify() {
    //深拷贝
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
}

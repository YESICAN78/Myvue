/*
 * @Author: sunFulin
 * @Date: 2022-09-29 14:52:24
 * @LastEditTime: 2022-10-09 13:22:39
 */
import Observer from "./Observer.js";
export default class Sun_Vue {
  constructor(options) {
    this._el = options.el;
    this._template = document.querySelector(this._el);
    this._data = options.data;
    this.init();
  }
  init() {
    console.log(this._template)
    this._data.userlist = [
      {
        name: "黄忠",
        age: "56",
      },
    ];
    let observer = new Observer(this._data);
    observer._value.userlist.push({
      name: "jiaguwen",
      age: 90,
    });
    console.log(observer);
  }
}

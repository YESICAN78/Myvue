/*
 * @Author: sunFulin
 * @Date: 2022-09-29 14:52:24
 * @LastEditTime: 2022-09-30 13:45:31
 */
import Observer from "./Observer.js";
export default class Sun_Vue {
  constructor(options) {
    this._data = options.data;
    this.init();
  }
  init() {
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

/*
 * @Author: sunFulin
 * @Date: 2022-09-29 14:52:24
 * @LastEditTime: 2022-09-29 17:34:41
 */
import Observer from "./Observer.js";
export default class Sun_Vue {
  constructor(options) {
    this._data = options.data;
    this.init();
  }
  init() {
    new Observer(this._data);
    this._data.list = {
      name: "999",
    };
    console.log(this._data);
  }
}

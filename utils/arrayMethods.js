/*
 * @Author: sunFulin
 * @Date: 2022-09-30 08:55:46
 * @LastEditTime: 2022-09-30 14:11:15
 */
import Observer from "../Observer.js";
import { def } from "./def.js";
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
["shift", "unshift", "pop", "splice", "push"].forEach((method) => {
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    let ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
	/**
	 * 调用Observer实例上observerArr方法给新增加的数据响应式
	 * */ 
    if (inserted) ob.observerArr(inserted);
    // 监听到数组变化向依赖发送通知
    ob.dep.notify();
    return result;
  });
});

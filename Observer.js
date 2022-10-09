/*
 * @Author: sunFulin
 * @Date: 2022-09-29 15:06:42
 * @LastEditTime: 2022-10-09 13:15:15
 */
import Dep from "./Dep.js";
import { arrayMethods } from "./utils/arrayMethods.js";
import { observer } from "./utils/observer.js";
import { def } from "./utils/def.js";
/**
 * Observer 类会被附加倒每个侦测的object上
 * 一旦被附加上的属性，Observe会将object的所有属性转换为getter/serter的形式
 * 来收集属性的依赖，并且当属性变化的时会通知这些依赖
 * */
export default class Observer {
  constructor(value) {
    this._value = value;
    /**
	 * 
	 这里在Observer上保存实例的 Dep 实例的理有是，数组在getter中收集依赖
	 在拦截器中触发，它必须在getter和拦截器中都可以访问到
	*/
    this.dep = new Dep();
    /**
     * 给每个value上新增一个不可枚举的属性__ob__，这个属性就是当前Observer的实例
     * 这样我们可以数组的数据的__ob__属性拿到Observer实例，然后就可以拿到__ob__上的dep了
     * 当然__ob__不仅仅只是为了在拦截器中访问Observer实例这么简单，还可以用来标记
     * 当前value是否被Observer转换成响应式数据
     * */
    def(value, "__ob__", this);
    // __proto__ 是否兼容浏览器
    const hasProto = "__proto__" in {};
    const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observerArr(value);
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
  observerArr(value) {
    for (let i = 0; i < value.length; i++) {
      observer(value[i]);
    }
  }
}
function defineReactive(obj, key, val) {
  if (typeof val === "object") new Observer(val);
  /**
   * observer 方法给每个value 创建Observer 实例，如果value已经存在Observer实例
   * 就返回当前实例，否则给当前value创建一个新的实例
   * */
  let childOb = observer(val);
  // 收集依赖
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: () => {
      dep.depend();
      if (!!childOb) {
        childOb.dep.depend();
      }
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

function protoAugment(target, src) {
  target.__proto__ = src;
}
function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    def(target, key, src[key]);
  }
}

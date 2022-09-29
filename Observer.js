/*
 * @Author: sunFulin
 * @Date: 2022-09-29 15:06:42
 * @LastEditTime: 2022-09-29 17:31:01
 */
import Dep from "./Dep.js";
import {
	arrayMethods
} from './utils/arrayMethods.js'
import {
	observer
} from './utils/observer.js'
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
		this.dep = new Dep()
		// __proto__ 是否兼容浏览器
		const hasProto = '__proto__' in {}
		const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
		if (Array.isArray(value)) {
			const augment = !hasProto ? protoAugment : copyAugment
			augment(value, arrayMethods, arrayKeys)
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
}

function defineReactive(obj, key, val) {
	if (typeof val === "object") new Observer(val);
	let childOb = observer(val)
	// 收集依赖
	let dep = new Dep();
	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: true,
		get: () => {
			dep.depend();
			if(childOb){
				childOb.dep.depend()
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

function protoAugment(target, src, keys) {
	target.__proto__ = src
}

function copyAugment(target, src, keys) {
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		// def(target, key, src[key])
	}
}

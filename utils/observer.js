import {
	hasOwn
} from './hasOwn.js'
import {
	isObject
} from './isObject.js'
import Observer from '../Observer.js'
export function observer(value) {
	if (!isObject(value)) {
		return
	}
	let ob;
	if (hasOwn(value, '__ob__') && value.__ob__ instanceof new Observer()){
		 ob = value.__ob__;
	}else {
		ob = new Observer(value)
	}
	return ob
}

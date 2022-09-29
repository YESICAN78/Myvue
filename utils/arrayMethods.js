import Observer from '../Observer.js'
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
['push', 'pop'].forEach(method => {
	arrayMethods[method] = function() {
		for (let i = 0; i < arguments.length; i++) {
			Observer(arguments[i])
		}
		return Array.prototype[method].apply(this, arguments)
	}
})

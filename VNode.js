/*
 * @Author: sunFulin
 * @Date: 2022-10-08 14:58:02
 * @LastEditTime: 2022-10-08 16:40:39
 */
/**
 * VNode 的作用：由于每次渲染视图都要创建vnode,然后使用它创建真实DOM插入到页面中，所以可以将上一次
 * 渲染的DOM缓存起来，将新创建的vnode和上一次缓存的vnode进行对比，找出不一样的地方去修改真实DOM。
 * */ 
export default class VNode {
  constructor(
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.componentOptions = componentOptions;
    this.asyncFactory = asyncFactory;
  }
}

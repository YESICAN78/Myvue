/*
 * @Author: sunFulin
 * @Date: 2022-10-09 10:56:49
 * @LastEditTime: 2022-10-09 11:06:01
 */
import VNode from "./VNode.js";
// 克隆节点：将现有的节点属性复制到新的节点中，让新创建的节点和被创建的节点属性保持一致。
// 作用：优化静态节点和插槽节点
export function cloneVNode(vnode, deep) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneVNode(vnode.children, deep);
  }
  return cloned;
}

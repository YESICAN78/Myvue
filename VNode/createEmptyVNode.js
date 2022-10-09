/*
 * @Author: sunFulin
 * @Date: 2022-10-09 10:48:05
 * @LastEditTime: 2022-10-09 10:54:15
 */
import VNode from "./VNode.js";
// 创建注释节点
export function createEmptyVNode(text) {
  const node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
}

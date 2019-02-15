import entryReact from './react';
import isObject from 'lodash/isObject';

/**
 * 组件入口类，在实例化该类时，需要定义初始值
 * 提供一些方法给外部调用
 */
export default class Index {
  constructor(opts) {
    this.opts = opts || {};
  }
  
  // 生成 dom
  run() {
    if (!isObject(this.opts)) return;
    entryReact.init(this.opts);
  }

  // 保存所选数据
  save(cb) {
    entryReact.onSave(cb);
  }
  
  // 取消当前所选数据，保存上一次所选数据，如果当前为第一次操作，则清空所选数据
  cancel(cb) {
    entryReact.onCancel(cb);
  }

  // 清空所有数据
  clear(cb) {
    entryReact.onClear(cb);
  }
}
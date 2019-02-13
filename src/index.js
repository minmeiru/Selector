import treeSelect from './react';
import isObject from 'lodash/isObject';

/**
 * 组件入口类，在实例化该类时，需要定义初始值
 */
export default class Index {
  constructor(opts) {
    this.opts = opts || {};
  }
  
  run() {
    if (!isObject(this.opts)) return;
    treeSelect(this.opts);
  }
}
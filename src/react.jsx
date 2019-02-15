import React from 'react';
import ReactDOM from 'react-dom';
import isElement from 'lodash/isElement';
import cloneDeep from 'lodash/cloneDeep';
import App from './App';

/**
 * @description 组件初始化
 * @param element  {element}  用来包裹组件渲染的 dom 节点, 不传默认为 body
 * @param data  {array}  树形选择的数据源: [{childrens: {}, parent:{}, subs:{}}] - childrens: 子节点, -parent: 父节点, -subs: 子元素
 * @param defaultSelections  {array}  默认选中的节点
 * @param isIncludeSub  {boolean}  是否展示子元素,默认不展示
 * @param fieldKeys  {object}  需要转化的字段匹配对应表 { subs: '', parent: '' }
 * @param inputPlaceholder  {string}  搜索框 placeholder
 * @param selectColTitleText  {string}  右侧选中区域的标题
 * @param onSelect  {function}  选中/取消等操作的回调函数
 */
function init({
    element,
    data = [],
    defaultSelections = [],
    isIncludeSub = false,
    fieldKeys = { subs: 'users', parent: 'department' },
    inputPlaceholder,
    selectColTitleText,
    onSelect,
  }) {
  let container;
  if (element && isElement(element)) {
    container = element;
  } else {
    container = element || document.createElement('div');
    document.body.appendChild(container);
  }
  
  // 整理树形结构的数据
  const list = loop(cloneDeep(data), fieldKeys);
  // 拉平数据结构
  const flattenList = flattenData(data, null, fieldKeys, isIncludeSub);
  
  // 默认列表中的数据必须都被包含在 list 列表中
  let defaultData = [];
  defaultSelections.forEach(item => {
    const findItem = list.find(o => o.id === item.id);
    if (findItem) defaultData.push(findItem);
  });

  ReactDOM.render((
    <App
      list={list}
      defaultSelections={defaultData}
      flattenList={flattenList}
      isIncludeSub={isIncludeSub}
      inputPlaceholder={inputPlaceholder}
      selectColTitleText={selectColTitleText}
      onSelect={onSelect}
    />
  ), container);
}

/**
 * 部门数据结构扁平化
 * @param data  {array}  树形结构的数据源 [{ childrens: {}, parent:{}, subs:{} }]
 * @param lastItem  {object}  父级数据对象
 * @param fieldKeys  {object} 需要转化的字段匹配对应表 { subs: '', parent: '' }
 * @param isSub  {boolean}  是否处理子集
 * @returns {Array} [{ id: '', name: '', ... }, ...]
 */
function flattenData(data = [], lastItem, fieldKeys = {}, isSub = false) {
  let list = [];
  
  data.forEach(item => {
    if (item[fieldKeys.parent]) {
      const parentId = lastItem && lastItem[fieldKeys.parent] ? lastItem[fieldKeys.parent].id : null;

      list.push({
        id: item[fieldKeys.parent].id,
        name: item[fieldKeys.parent].name,
        type: 'parent',
        parentId,
      });
    }
    
    if (isSub && item[fieldKeys.subs]) {
      item[fieldKeys.subs].forEach(sub => list.push({ id: sub.id, name: sub.name, type: 'sub', parentId: item[fieldKeys.parent] ? item[fieldKeys.parent].id : null }));
    }

    if (item.childrens) {
      list = [...list, ...flattenData(item.childrens, item, fieldKeys, isSub)];
    }
  });
  return list;
}

/**
 * @description  整理树形数据源的结构
 * @param data
 * @param fieldKeys  {object}  需要转化的字段匹配对应表 { subs: '', parent: '' }
 * @returns {Array}  [{ parent:{}, childrens:[], subs:[]}, ...]
 */
function loop(data = [], fieldKeys = {}) {
  data.forEach(item => {
    if (item[fieldKeys.parent]) {
      item.parent = item[fieldKeys.parent];
      delete item[fieldKeys.parent];
    }

    if (item[fieldKeys.subs]) {
      item.subs = item[fieldKeys.subs];
      delete item[fieldKeys.subs];
    }

    if (item.childrens) {
      loop(item.childrens, fieldKeys);
    }
  });
  
  return data;
}

export default {
  init,
  onSave: (cb) => App.onSave(cb),               // 保存选择的数据
  onCancel: (cb) => App.onCancel(cb),           // 取消当前操作，并清除临时选择的数据，只保留上一次所选择的数据
  onClear: (cb) => App.onClear(cb),             // 清除所有数据
}
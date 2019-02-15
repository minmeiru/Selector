import React from 'react';
import ReactDOM from 'react-dom';
import isElement from 'lodash/isElement'
import App from './App';

function init({ element, data = [], inputPlaceholder, selectColTitleText, onSelect }) {
  let container;
  if (element && isElement(element)) {
    container = element;
  } else {
    container = element || document.createElement('div');
    document.body.appendChild(container);
  }

  ReactDOM.render((
    <App
      data={data}
      inputPlaceholder={inputPlaceholder}
      selectColTitleText={selectColTitleText}
      onSelect={onSelect}
    />
  ), container);
}

export default {
  init,
  onSave: (cb) => App.onSave(cb),               // 保存选择的数据
  onCancel: (cb) => App.onCancel(cb),           // 取消当前操作，并清除临时选择的数据，只保留上一次所选择的数据
  onClear: (cb) => App.onClear(cb),             // 清除所有数据
}
import React from 'react';
import ReactDOM from 'react-dom';
import isElement from 'lodash/isElement'
import App from './App';

export default function treeSelect({ element, data, inputPlaceholder, selectColTitleText, handleSelect }) {
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
      onHandleSelect={handleSelect}
    />
  ), container);
}

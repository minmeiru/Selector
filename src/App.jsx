import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from 'antd';
import Tree from './containers/tree/Tree';

const Wrapper = styled.div`
  width: 600px;
`;

export default class App extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    inputPlaceholder: PropTypes.string,
    selectColTitleText: PropTypes.string,
    onHandleSelect: PropTypes.func,
  };
  
  static defaultProps = {
    data: [],
    inputPlaceholder: '',
    selectColTitleText: '',
    onHandleSelect() {},
  };
  
  state = {
  
  };
  
  constructor(props) {
    super(props);
  }
  
  handleBtnClick = () => {
    const { onHandleSelect } = this.props;
    if (onHandleSelect) onHandleSelect();
  };
  
  render() {
    const { data, inputPlaceholder, selectColTitleText } = this.props;

    return (
      <Wrapper>
        <Tree
          list={data}
          placeholder={inputPlaceholder}
        />
        
        <Button type="primary" onClick={this.handleBtnClick} block>按钮</Button>
      </Wrapper>
    );
  }
}
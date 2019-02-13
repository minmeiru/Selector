import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from 'antd';

const Wrapper = styled.div`
  width: 100%;
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
  
  state = {};
  
  constructor(props) {
    super(props);
  }
  
  handleBtnClick = () => {
    const { onHandleSelect, inputPlaceholder, selectColTitleText } = this.props;
    if (onHandleSelect) onHandleSelect({ inputPlaceholder, selectColTitleText });
  };
  
  render() {
    return (
      <div>
        tree app
        <Button type="primary" onClick={this.handleBtnClick}>按钮</Button>
      </div>
    );
  }
}
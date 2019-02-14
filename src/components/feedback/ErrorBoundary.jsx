import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../utils/style-consts';

const Wrapper = styled.div`
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  background-color: white;
`;

const Content = styled.div`
  align-self: center;
  text-align: center;
  width: 100%;
`;

const Text = styled.div`
  color: ${colors.gray};
`;

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  state = { error: null };

  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <Wrapper>
          <Content>
            <Text>暂时出错了，抱歉～</Text>
          </Content>
        </Wrapper>
      );
    }

    return this.props.children;
  }
}

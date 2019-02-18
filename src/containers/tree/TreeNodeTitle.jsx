import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import ErrorBoundary from '../../components/feedback/ErrorBoundary';

const Wrapper = styled.span`
  width: 100%;
  padding-right: 20px;
  position: relative;
  
  i {
    position: absolute;
    right: 0;
    top: 3px;
  }
`;

function TreeNodeTitle({ text, active }) {
  return (
    <Wrapper>
      {text}
      {active && <Icon type="check" />}
    </Wrapper>
  );
}

TreeNodeTitle.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
};

TreeNodeTitle.defaultProps = {
  text: '',
  active: false,
};

function ErrorWrapper(props) {
  return (<ErrorBoundary><TreeNodeTitle {...props} /></ErrorBoundary>);
}

export default ErrorWrapper;
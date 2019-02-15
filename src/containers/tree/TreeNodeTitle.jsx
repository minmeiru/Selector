import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import { colors } from '../../utils/style-consts';
import ErrorBoundary from '../../components/feedback/ErrorBoundary';

const Wrapper = styled.span`
  width: 100%;
  
  i {
    float: right;
    margin-top: 5px;
  }
`;

const iconStyle = {
  color: colors.positive,
};

function TreeNodeTitle({ text, active }) {
  return (
    <Wrapper>
      {text}
      {active && <Icon type="check" style={iconStyle} />}
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
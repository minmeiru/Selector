import * as React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../utils/style-consts';
import { Wrapper, StyledTitle, StyledContent, StyledItem } from './styled';
import { Icon } from 'antd';

import ErrorBoundary from '../../components/feedback/ErrorBoundary';

const beforeIconStyle = {
  color: colors.positive,
  marginRight: '10px',
};

const afterIconStyle = {
  float: 'right',
  lineHeight: '32px',
  marginRight: '10px',
};

function SelectionPanel({ selectColTitleText, selections, onDelSelection }) {
  function delSelection(selection) {
    return () => {
      if (onDelSelection) onDelSelection(selection);
    }
  }
  
  return (
    <Wrapper>
      <StyledTitle>{selectColTitleText}</StyledTitle>
      <StyledContent>
        {selections.map((item, idx) => {
          return (
            <StyledItem key={idx}>
              <Icon type="folder" style={beforeIconStyle} theme="filled" />
              {item.name}
              <Icon
                type="close"
                style={afterIconStyle}
                onClick={delSelection(item)}
              />
            </StyledItem>
          );
        })}
      </StyledContent>
    </Wrapper>
  );
}

SelectionPanel.propTypes = {
  selectColTitleText: PropTypes.string,
  selectionList: PropTypes.array,
  onDelSelection: PropTypes.func,
};

SelectionPanel.defaultProps = {
  selectColTitleText: '',
  selectionList: [],
  onDelSelection() {},
};

function ErrorWrapper(props) {
  return (<ErrorBoundary><SelectionPanel {...props} /></ErrorBoundary>);
}

export default ErrorWrapper;
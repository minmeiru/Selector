import * as React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, StyledTitle, StyledContent, StyledItem, StyledBeforeIcon, StyledAfterIcon } from './styled';
import { Icon } from 'antd';

import ErrorBoundary from '../../components/feedback/ErrorBoundary';

function SelectionPanel({ selectColTitleText, selections, onDelSelection, parentIcon, subIcon }) {
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
              <StyledBeforeIcon>{item.type === 'parent' ? parentIcon : subIcon}</StyledBeforeIcon>
              {item.name}
              <StyledAfterIcon>
                <Icon type="close" onClick={delSelection(item)} />
              </StyledAfterIcon>
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
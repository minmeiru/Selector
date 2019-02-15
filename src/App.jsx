import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { clearfix, colors } from './utils/style-consts';

import { Icon } from 'antd';
import Tree from './containers/tree/Tree';
import SelectionPanel from './containers/selection-panel/SelectionPanel';

const Wrapper = styled.div`
  width: 600px;
  padding: 10px 0 20px;
  ${clearfix};
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selections: props.defaultSelections || [],        // 当前已被选中的节点数组
      tempSelections: [],                               // 临时选择的数据
      lastSelections: props.defaultSelections || [],    // 上一次选择的数据
    };

    App.onSave = this.onSave.bind(this);
    App.onCancel = this.onCancel.bind(this);
    App.onClear = this.onClear.bind(this);
  }

  handleSelect = (selectionList, tempSelections) => {
    const { onSelect } = this.props;
    this.setState({ selections: [...selectionList], tempSelections: [...tempSelections] }, () => {
      if (onSelect) onSelect(this.state.selections);
    });
  };
  
  handleDelSelection = (result) => {
    const { onSelect } = this.props;
    const selections = this.state.selections.filter(item => item.id !== result.id);
    const tempSelections = this.state.tempSelections.filter(item => item.id !== result.id);

    this.setState({ selections: [...selections], tempSelections: [...tempSelections] }, () => {
      if (onSelect) onSelect(this.state.selections);
    });
  };
  
  onSave = (cb) => {
    const { selections } = this.state;
    this.setState({ lastSelections: selections, tempSelections: [] });
    if (cb) cb(selections);
  };
  
  onCancel = (cb) => {
    const { lastSelections } = this.state;
    this.setState({ selections: lastSelections, tempSelections: [] });
    if (cb) cb(lastSelections);
  };
  
  onClear = (cb) => {
    this.setState({ selections: [], tempSelections: [], lastSelections: [] });
    if (cb) cb([]);
  };
  
  render() {
    const { list, flattenList, inputPlaceholder, selectColTitleText, isIncludeSub, parentIcon, subIcon } = this.props;

    return (
      <Wrapper>
        <Tree
          list={list}
          flattenList={flattenList}
          isIncludeSub={isIncludeSub}
          parentIcon={parentIcon}
          subIcon={subIcon}
          selections={this.state.selections}
          placeholder={inputPlaceholder}
          onSelect={this.handleSelect}
        />
  
        <SelectionPanel
          selections={this.state.selections}
          parentIcon={parentIcon}
          subIcon={subIcon}
          selectColTitleText={selectColTitleText}
          onDelSelection={this.handleDelSelection}
        />
      </Wrapper>
    );
  }
}

App.propTypes = {
  list: PropTypes.array.isRequired,
  defaultSelections: PropTypes.array,
  inputPlaceholder: PropTypes.string,
  selectColTitleText: PropTypes.string,
  isIncludeSub: PropTypes.bool,
  parentIcon: PropTypes.element,
  subIcon: PropTypes.element,
  onSelect: PropTypes.func,
};

App.defaultProps = {
  list: [],
  defaultSelections: [],
  inputPlaceholder: '搜索部门',
  selectColTitleText: '已选择的部门',
  isIncludeSub: false,
  parentIcon: <Icon type="folder" style={{ color: colors.positive }} theme="filled" />,
  subIcon: <Icon type="file" style={{ color: colors.positive }} theme="filled" />,
  onSelect() {},
};

export default App;
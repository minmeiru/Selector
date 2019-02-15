import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { clearfix } from './utils/style-consts';

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
      selections: [],                     // 当前已被选中的节点数组
      tempSelections: [],                 // 临时选择的数据
      lastSelections: [],                 // 上一次选择的数据
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
    let { selections, tempSelections } = this.state;
  
    // 判断选择的该项是否包含在已选中的列表中，如果已被选中，再次点击则取消选中状态，否则反之
    if (selections.some(o => o.id === result.id.toString())) {
      selections = selections.filter(item => {
        return item.id !== result.id.toString();
      });
    } else {
      selections.push({ id: result.id.toString(), name: result.name });
    }
  
    if (tempSelections.some(o => o.id === result.id.toString())) {
      tempSelections = tempSelections.filter(item => {
        return item.id !== result.id.toString();
      });
    } else {
      tempSelections.push({ id: result.id.toString(), name: result.name });
    }
  
    this.setState({ selections: [...selections], tempSelections: [...tempSelections] }, () => {
      if (onSelect) onSelect(this.state.selections);
    });
  };
  
  onSave = (cb) => {
    const { selections } = this.state;
    this.setState({ lastSelections: selections, tempSelections: [] });
    if (cb) cb(selections.map(o => ({ id: Number(o.id), name: o.name })));
  };
  
  onCancel = (cb) => {
    const { lastSelections } = this.state;
    this.setState({ selections: lastSelections, tempSelections: [] });
    if (cb) cb(lastSelections.map(o => ({ id: Number(o.id), name: o.name })));
  };
  
  onClear = (cb) => {
    this.setState({ selections: [], tempSelections: [], lastSelections: [] });
    if (cb) cb([]);
  };
  
  render() {
    const { data, inputPlaceholder, selectColTitleText } = this.props;

    return (
      <Wrapper>
        <Tree
          list={data}
          selections={this.state.selections}
          placeholder={inputPlaceholder}
          onSelect={this.handleSelect}
        />
  
        <SelectionPanel
          selections={this.state.selections}
          selectColTitleText={selectColTitleText}
          onDelSelection={this.handleDelSelection}
        />
      </Wrapper>
    );
  }
}

App.propTypes = {
  data: PropTypes.array,
  inputPlaceholder: PropTypes.string,
  selectColTitleText: PropTypes.string,
  onSelect: PropTypes.func,
};

App.defaultProps = {
  data: [],
  inputPlaceholder: '',
  selectColTitleText: '',
  onSelect() {},
};

export default App;
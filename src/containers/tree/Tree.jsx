import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { colors } from '../../utils/style-consts';

import { Tree, Icon } from 'antd';
import ErrorBoundary from '../../components/feedback/ErrorBoundary';
import Search from '../../components/search';
import SearchList from '../../components/search-list';

import TreeNodeTitle from './TreeNodeTitle';

const TreeNode = Tree.TreeNode;

const Wrapper = styled.div`
  width: 280px;
  float: left;
  padding: 10px 0 20px;
  background-color: #fff;
`;

const TreeWrapper = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  width: 100%;
  height: 300px;
  overflow: auto;
  
  .ant-tree {
    li {
      .ant-tree-node-content-wrapper {
        width: calc(100% - 30px);
        
        &:hover {
          background-color: ${colors.positiveHover};
        }
      }
      
      .ant-tree-node-selected {
        background-color: transparent;
        
        &:hover {
          background-color: ${colors.positiveHover};
        }
      }
    }
  }
`;

const SearchResultWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: auto;
`;

const iconStyle = {
  color: colors.positive,
};

class Index extends React.PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    selections: PropTypes.array,
  };
  
  static defaultProps = {
    selections: [],
  };
  
  // 部门数据结构扁平化
  static flattenData(data = []) {
    let list = [];
  
    data.forEach(item => {
      list.push({ id: item.department.id, name: item.department.name });
      if (item.childrens) {
        list = [...list, ...Index.flattenData(item.childrens)];
      }
    });
    return list;
  }
  
  constructor(props) {
    super(props);
  
    this.state = {
      showTree: true,
      searchList: [],                                       // 根据搜索的关键字匹配出来的列表
      flattenList: Index.flattenData(props.list),           // 扁平化后的部门列表
      selectionList: props.selections,                      // 当前已被选中的节点数组
      tempSelections: [],                                   // 临时选择的数据
      lastSelections: props.selections,                     // 上一次选择的数据
    };
  
    console.log('flattenList ', Index.flattenData(this.props.list));
    console.log('list ', this.props.list);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      this.setState({ flattenList: Index.flattenData(this.props.list) });
    }
  
    if (prevProps.selections !== this.props.selections) {
      this.setState({
        selectionList: this.props.selections,
        lastSelections: this.props.selections,
      });
    }
  }
  
  // 处理搜索逻辑
  handleSearch = (result) => {
    debounce((value) => {
      // 筛选搜索内容相关的数据
      const searchList = this.state.flattenList.filter(item => item.name.indexOf(value) > -1);
      
      this.setState({
        showTree: !value,
        searchList: [...searchList],
      });
    }, 500)(result);
  };

  handleClear = () => {
    this.setState({
      showTree: true,
      searchList: [],
    });
  };

  // 处理 tree select
  handleTreeSelect = (selectedKeys) => {
    let selectionList = [];
    let tempSelections = [];
  
    // 树行选择右侧 显示所选部门
    selectedKeys.forEach(item => {
      const findItem = this.state.flattenList.find(o => o.id.toString() === item);
      const name = typeof findItem === 'object' ? findItem.name : '';
      const obj = { id: item, name };
      selectionList.push(obj);
      tempSelections.push(obj);
    });
  
    this.setState({ selectionList, tempSelections });
  };

  // 搜索结果列表的筛选
  handleSearchListSelect = (result) => {
    let { selectionList, tempSelections } = this.state;
  
    // 判断选择的该项是否包含在已选中的列表中，如果已被选中，再次点击则取消选中状态，否则反之
    if (selectionList.some(o => o.id === result.id.toString())) {
      selectionList = selectionList.filter(item => {
        return item.id !== result.id.toString();
      });
    } else {
      selectionList.push({ id: result.id.toString(), name: result.name });
    }
  
    if (tempSelections.some(o => o.id === result.id.toString())) {
      tempSelections = tempSelections.filter(item => {
        return item.id !== result.id.toString();
      });
    } else {
      tempSelections.push({ id: result.id.toString(), name: result.name });
    }
    
    this.setState({ selectionList: [...selectionList], tempSelections: [...tempSelections] });
  };

  loopRenderTreeNode = (data, selectedKeys) => {
    return data.map((item) => {
      // 根据 selectedKeys 数组判断当前 item 是否被选中
      const titleNode = (<TreeNodeTitle text={item.department.name} active={selectedKeys.some(o => o === item.department.id.toString())} />);

      // 如果节点还有子节点, 递归
      if (item.childrens) {
        return (
          <TreeNode
            key={item.department.id}
            title={titleNode}
            icon={<Icon type="folder" style={iconStyle} theme="filled" />}
          >
            {this.loopRenderTreeNode(item.childrens, selectedKeys)}
          </TreeNode>
        );
      }
      // 没有子节点,直接返回节点本身
      return (
        <TreeNode
          key={item.department.id}
          title={titleNode}
          icon={<Icon type="folder" style={iconStyle} theme="filled" />}
        />
      );
    });
  };
  
  render() {
    const { list, placeholder } = this.props;
    const { showTree, searchList, selectionList } = this.state;
    const selectedKeys = selectionList.map(item => item.id);

    return (
      <Wrapper>
        <Search
          placeholder={placeholder}
          onSearch={this.handleSearch}
          onClear={this.handleClear}
        />

        <TreeWrapper show={showTree}>
          <Tree
            multiple
            showIcon
            selectedKeys={selectedKeys}
            onSelect={this.handleTreeSelect}
          >
            {this.loopRenderTreeNode(list, selectedKeys)}
          </Tree>
        </TreeWrapper>
  
        {!showTree && (
          <SearchResultWrapper>
            <SearchList
              list={searchList}
              selectedKeys={selectedKeys}
              onSelect={this.handleSearchListSelect}
            />
          </SearchResultWrapper>
        )}

      </Wrapper>
    );
  }
}

function ErrorWrapper(props) {
  return (<ErrorBoundary><Index {...props} /></ErrorBoundary>);
}

export default ErrorWrapper;
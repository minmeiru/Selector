import * as React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Wrapper, TreeWrapper } from './styled';

import { Tree } from 'antd';
import ErrorBoundary from '../../components/feedback/ErrorBoundary';
import Search from '../../components/search';

import TreeNodeTitle from './TreeNodeTitle';

const TreeNode = Tree.TreeNode;

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      showTree: true,
      searchList: [],                                       // 根据搜索的关键字匹配出来的列表
      selectionList: props.selections,                      // 当前已被选中的节点数组
      tempSelections: [],                                   // 临时选择的数据
    };
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.selections !== this.props.selections) {
      this.setState({
        selectionList: this.props.selections,
      });
    }
  }
  
  // 处理搜索逻辑
  handleSearch = result => {
    debounce((value) => {
      // 筛选搜索内容相关的数据
      const searchList = this.props.flattenList.filter(item => item.name.indexOf(value) > -1);
      
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
  handleTreeSelect = selectedKeys => {
    let selectionList = [];
    let tempSelections = [];
    
    // 树行选择右侧 显示所选部门
    selectedKeys.forEach(item => {
      const findItem = this.props.flattenList.find(o => o.id.toString() === item);
      selectionList.push(findItem);
      tempSelections.push(findItem);
    });
    
    this.setState({ selectionList, tempSelections });
    
    this.props.onSelect(selectionList, tempSelections);
  };
  
  renderTree = () => {
    const { parentIcon, subIcon, isIncludeSub, list } = this.props;
    const { showTree, selectionList } = this.state;
    if (!list.length) return;
    // 设置当前选中的树节点
    const selectedKeys = selectionList.map(item => item.id.toString());
    
    const loop = data => data.map((item) => {
      const parentTitle = (<TreeNodeTitle text={item.parent.name} active={selectedKeys.some(o => o === item.parent.id.toString())} />);
      
      // 如果节点还有子节点, 递归
      if (item.childrens) {
        return (
          <TreeNode
            key={item.parent.id}
            title={parentTitle}
            icon={parentIcon}
          >
            
            {isIncludeSub ?
              item.subs.map(sub => {
                return (
                  <TreeNode
                    key={sub.id}
                    title={<TreeNodeTitle text={sub.name} active={selectedKeys.some(o => o === sub.id.toString())} />}
                    icon={subIcon}
                  />
                );
              })
              :
              null
            }
            
            {loop(item.childrens)}
          </TreeNode>
        );
      }
      
      // 没有子节点,直接返回节点本身和他的直属子节点
      return (
        <TreeNode
          key={item.parent.id}
          title={parentTitle}
          icon={parentIcon}
        >
          {isIncludeSub ?
            item.subs.map(sub => {
              return (
                <TreeNode
                  key={sub.id}
                  title={<TreeNodeTitle text={sub.name} active={selectedKeys.some(o => o === sub.id.toString())} />}
                  icon={subIcon}
                />
              );
            })
            :
            null
          }
        </TreeNode>
      );
    });
    
    // 搜索后展示的 treeNode
    const searchNode = () => {
      const { searchList } = this.state;
      
      return searchList.map(item => {
        return (
          <TreeNode
            key={item.id}
            title={<TreeNodeTitle text={item.name} active={selectedKeys.some(o => o === item.id.toString())} />}
            icon={item.type === 'parent' ? parentIcon : subIcon}
          />
        );
      });
    };
    
    return (
      <Tree
        multiple
        showIcon
        selectedKeys={selectedKeys}
        onSelect={this.handleTreeSelect}
      >
        {!showTree ? searchNode() : loop(this.props.list)}
      </Tree>
    );
  };
  
  render() {
    return (
      <Wrapper>
        <Search
          placeholder={this.props.placeholder}
          onSearch={this.handleSearch}
          onClear={this.handleClear}
        />
        
        <TreeWrapper>
          {this.renderTree()}
        </TreeWrapper>
      </Wrapper>
    );
  }
}

Index.propTypes = {
  list: PropTypes.array.isRequired,
  flattenList: PropTypes.array.isRequired,
  selections: PropTypes.array.isRequired,
  isIncludeSub: PropTypes.bool.isRequired,
  parentIcon: PropTypes.element.isRequired,
  subIcon: PropTypes.element.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function ErrorWrapper(props) {
  return (<ErrorBoundary><Index {...props} /></ErrorBoundary>);
}

export default ErrorWrapper;
import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Icon } from 'antd';
import trim from 'lodash/trim';

const Wrapper = styled.div`
  width: 100%;
  
  .anticon-close-circle {
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s;
    font-size: 12px;
  }
  
  .anticon-close-circle:hover {
    color: #999;
  }
  
  .anticon-close-circle:active {
    color: #666;
  }
`;

export default class Search extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
  };
  
  static defaultProps = {
    placeholder: '',
    onSearch() {},
    onClear() {},
  };
  
  state = {
    searchKey: '',
  };
  
  constructor(props) {
    super(props);
    
    this.inputRef = React.createRef();
    this.prefixStyle = {
      color: 'rgba(0, 0, 0, 0.25)',
    };
  }
  
  emitEmpty = () => {
    const { onClear } = this.props;
    this.inputRef.current.focus();
    this.setState({ searchKey: '' });
    if (onClear) onClear();
  };
  
  handleChange = e => {
    const { onSearch } = this.props;
    const value = e.target.value;
    
    this.setState({ searchKey: value });
    if (onSearch) onSearch(trim(value));
  };
  
  render() {
    const { placeholder } = this.props;
    const { searchKey } = this.state;
    const suffix = searchKey ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    
    return (
      <Wrapper>
        <Input
          ref={this.inputRef}
          placeholder={placeholder}
          prefix={<Icon type="search" style={this.prefixStyle} />}
          suffix={suffix}
          value={searchKey}
          onChange={this.handleChange}
        />
      </Wrapper>
    );
  }
}
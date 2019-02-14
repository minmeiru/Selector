import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../utils/style-consts';
import { Icon } from 'antd';

const Wrapper = styled.div`
  & > div:first-child {
    margin-top: 7px;
  }

  & > div:last-child {
    margin-bottom: 7px;
  }
`;

const Item = styled.div`
  position: relative;
  padding: 0 24px;
  border-radius: 2px;
  cursor: pointer;
  vertical-align: top;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
  transition: all 0.3s;
  height: 24px;
  line-height: 24px;
  
  &:hover {
    background-color: ${colors.positiveHover};
  }
  
  & > i:first-child {
    height: 14px;
    width: 14px;
    position: absolute;
    left: 5px;
    top: 5px;
  }
  
  & > i:last-child {
    height: 14px;
    width: 14px;
    position: absolute;
    right: 5px;
    top: 5px;
  }
`;

const iconStyle = {
  color: colors.positive,
};

export default class SearchList extends React.PureComponent {
  static propTypes = {
    selectedKeys: PropTypes.array,
    onSelect: PropTypes.func,
  };
  
  static defaultProps = {
    selectedKeys: [],
    onSelect() {},
  };

  constructor(props) {
    super(props);
  }

  handleSelect = item => () => {
    const { onSelect } = this.props;
    if (onSelect) onSelect(item);
  };
  
  render() {
    const { list, selectedKeys } = this.props;

    return (
      <Wrapper>
        {list.map((item, idx) => {
          const active = selectedKeys.some(o => o === item.id.toString());
          return (
            <Item key={idx} active={active} onClick={this.handleSelect(item)}>
              <Icon type="folder" style={iconStyle} theme="filled" />
              <span>{item.name}</span>
              {active && <Icon type="check" style={iconStyle} />}
            </Item>
          );
        })}
      </Wrapper>
    );
  }
}
import styled from 'styled-components';
import { colors } from '../../utils/style-consts';

export const Wrapper = styled.div`
  width: 300px;
  float: left;
  padding-right: 20px;
  background-color: #fff;
`;

export const TreeWrapper = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  width: 100%;
  height: 340px;
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

export const SearchResultWrapper = styled.div`
  width: 100%;
  height: 340px;
  overflow: auto;
`;
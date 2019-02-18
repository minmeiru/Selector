import styled from 'styled-components';
import { colors } from '../../utils/style-consts';

export const Wrapper = styled.div`
  width: 300px;
  float: left;
  padding-right: 20px;
  background-color: #fff;
`;

export const TreeWrapper = styled.div`
  width: 100%;
  height: 340px;
  overflow: auto;
  
  .ant-tree {
    li {
      .ant-tree-node-content-wrapper {
        padding: 0;

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
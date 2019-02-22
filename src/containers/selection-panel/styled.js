import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-left: 20px;
  float: left;
  width: 300px;
  background: #fff;
  border-left: 1px solid #d9d9d9;
`;

export const StyledTitle = styled.div`
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #666;
`;

export const StyledContent = styled.div`
  width: 100%;
  height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const StyledItem = styled.div`
  padding: 0 24px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #666;
  position: relative;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const StyledBeforeIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`;

export const StyledAfterIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  text-align: center;
`;
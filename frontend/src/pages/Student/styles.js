import styled from 'styled-components';

export const Search = styled.div`
  display: flex;
  align-items: center;
  max-width: 237px;
  max-height: 36px;
  margin-left: 16px;
  border-radius: 4px;
  border: solid 1px #dddddd;
  background: #ffffff;
  padding: 10px 16px;

  input {
    margin-left: 8px;
    border: none;
    color: #999;
    ::placeholder {
      color: #999999;
      font-size: 14px;
    }
  }
`;

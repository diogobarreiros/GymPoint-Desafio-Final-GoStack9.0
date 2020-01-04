import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .asyncInput {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 45px;
    justify-content: center;

    input {
      height: 35px;
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;
